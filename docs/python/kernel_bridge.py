#!/usr/bin/env python3
"""
AIR Node — hQVM Kernel Bridge + Coordinator
Real Gyroscopic ASI hQVM Kernel (Python canonical)
+ App-layer Coordinator (GGG apertures, DomainLedgers, Fiat Shells)
Port 8788
"""
import json, sys
sys.path.insert(0, "/home/user/air-node/core/python")
from http.server import HTTPServer, BaseHTTPRequestHandler
from src.constants import step_state_by_byte, GENE_MAC_REST, unpack_state
from src.api import trajectory_parity_commitment, word_signature, q_word6_for_items, depth4_mask_projection48, depth4_intron_sequence32, mask12_for_byte, chirality_word6, try_state24_to_omega12
from src.kernel import Gyroscopic
from src.app.coordination import Coordinator, csm_total_mu, raw_microcells_per_moment
from src.app.events import Domain, EdgeID, GovernanceEvent, MICRO

coordinator = Coordinator()
kernel = coordinator.kernel  # Gyroscopic instance

genealogy_log = []

class H(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "content-type")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def do_GET(self):
        if self.path.startswith("/moment"):
            a,b = unpack_state(kernel.state24)
            omega = try_state24_to_omega12(kernel.state24)
            body = {
                "state24": kernel.state24,
                "state": kernel.state24 & 0xFFF,
                "a12": a, "b12": b,
                "a_hex": f"{a:03x}", "b_hex": f"{b:03x}",
                "state_hex": f"{kernel.state24:06x}",
                "step": kernel.step,
                "omega": {"u6": omega.u6, "v6": omega.v6, "shell": omega.shell, "chirality6": omega.chirality6} if omega else None,
                "chirality6": chirality_word6(kernel.state24),
                "omega_size": 4096,
                "rest": kernel.state24 == GENE_MAC_REST
            }
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(body).encode()); return
        if self.path.startswith("/genealogy"):
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(genealogy_log[-512:]).encode()); return
        if self.path.startswith("/status") or self.path.startswith("/coordination"):
            st = coordinator.get_status()
            body = {
                "kernel": st.kernel,
                "apertures": st.apertures,
                "ledgers": st.ledgers,
                "fiat": st.fiat,
                "csm_total_mu": csm_total_mu(),
                "n_phys": raw_microcells_per_moment(),
                "omega_size": 4096
            }
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(body, default=str).encode()); return
        if self.path.startswith("/apertures"):
            st = coordinator.get_status()
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(st.apertures).encode()); return
        if self.path.startswith("/ledger"):
            snap = coordinator.ledgers.snapshot()
            body = {
                "y_econ": snap.y_econ.tolist(),
                "y_emp": snap.y_emp.tolist(),
                "y_edu": snap.y_edu.tolist(),
                "aperture_econ": coordinator.ledgers.aperture(Domain.ECONOMY),
                "aperture_emp": coordinator.ledgers.aperture(Domain.EMPLOYMENT),
                "aperture_edu": coordinator.ledgers.aperture(Domain.EDUCATION),
            }
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(body).encode()); return
        self.send_response(404); self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length","0"))
        raw = self.rfile.read(length) if length else b"{}"
        try: data = json.loads(raw or "{}")
        except: data = {}
        if self.path == "/step":
            byte = int(data.get("byte", 0)) & 0xFF
            prev = kernel.state24
            # use coordinator.step_byte so event_log + domain ledger gets system event
            coordinator.step_byte(byte, emit_system_event=True)
            nxt = kernel.state24
            a,b = unpack_state(nxt)
            genealogy_log.append({
                "byte_input": byte,
                "prev_state": prev,
                "next_state": nxt,
                "a12": a, "b12": b,
                "mask12": mask12_for_byte(byte),
                "chirality": chirality_word6(nxt),
                "step": kernel.step
            })
            if len(genealogy_log) > 4096: del genealogy_log[:len(genealogy_log)-4096]
            resp = {"prev": prev, "next": nxt, "state24": nxt, "a12": a, "b12": b, "step": kernel.step}
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(resp).encode()); return

        if self.path == "/event_gov":
            # GovernanceEvent -> Domain ledger
            # body: {domain:"economy"|"employment"|"education", edge_id:0-5, magnitude_micro:int, confidence_micro?:int, meta?:{}}
            dom_map = {"economy": Domain.ECONOMY, "employment": Domain.EMPLOYMENT, "education": Domain.EDUCATION,
                       0: Domain.ECONOMY, 1: Domain.EMPLOYMENT, 2: Domain.EDUCATION}
            domain = dom_map.get(data.get("domain"), Domain.ECONOMY)
            edge_id = EdgeID(int(data.get("edge_id",0)) % 6)
            magnitude_micro = int(data.get("magnitude_micro", MICRO))
            confidence_micro = int(data.get("confidence_micro", MICRO))
            meta = data.get("meta", {})
            ev = GovernanceEvent(domain=domain, edge_id=edge_id, magnitude_micro=magnitude_micro, confidence_micro=confidence_micro, meta=meta)
            coordinator.apply_event(ev, bind_to_kernel_moment=True)
            # aperture after
            aperture = coordinator.ledgers.aperture(domain)
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps({"ok": True, "aperture": aperture, "kernel_state24": kernel.state24, "event_count": coordinator.ledgers.event_count}).encode())
            return

        if self.path == "/grant":
            # fiat grant add
            identity = str(data.get("identity", "anon"))
            mu_allocated = int(data.get("mu_allocated", data.get("amount_mu", 240)))
            try:
                coordinator.add_grant(identity, mu_allocated)
                self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
                self.wfile.write(json.dumps({"ok": True, "pending_grants_count": len(coordinator.fiat_grants_current)}).encode())
            except Exception as e:
                self.send_response(409); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
            return

        if self.path == "/close_shell":
            header = data.get("header", "shell")
            total_capacity_MU = int(data.get("total_capacity_MU", 1000000))
            try:
                shell = coordinator.close_shell(header, total_capacity_MU)
                self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
                self.wfile.write(json.dumps(shell.as_dict()).encode())
            except Exception as e:
                self.send_response(400); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
            return

        if self.path == "/fiat_status":
            st = coordinator.fiat_status()
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(st).encode()); return

        if self.path == "/moment_from_ledger":
            ledger = data.get("ledger", [])
            if isinstance(ledger, str):
                ledger = bytes.fromhex(ledger.replace("0x",""))
            else:
                ledger = bytes([int(x)&0xFF for x in ledger])
            from src.sdk import moment_from_ledger
            m = moment_from_ledger(ledger)
            sig = m.signature
            body = {
                "step": m.step,
                "state24": m.state24,
                "state_hex": f"{m.state24:06x}",
                "last_byte": m.last_byte,
                "parity_commitment": m.parity_commitment,
                "q_transport6": m.q_transport6,
                "tau_a12": sig.tau_a12,
                "tau_b12": sig.tau_b12,
                "parity": sig.parity
            }
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(body).encode()); return

        if self.path == "/frame4":
            b = data.get("bytes", [0,0,0,0])
            b0,b1,b2,b3 = [(int(x)&0xFF) for x in (list(b)+[0,0,0,0])[:4]]
            mask48 = depth4_mask_projection48(b0,b1,b2,b3)
            introns32 = depth4_intron_sequence32(b0,b1,b2,b3)
            s = GENE_MAC_REST
            for by in (b0,b1,b2,b3): s = step_state_by_byte(s, by)
            a_phi, b_phi = unpack_state(s)
            body = {"mask48": mask48, "introns32": introns32, "phi_a": a_phi, "phi_b": b_phi, "state24": s}
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(body).encode()); return

        if self.path == "/reset":
            coordinator.reset()
            genealogy_log.clear()
            self.send_response(200); self.send_header("Content-Type","application/json"); self._cors(); self.end_headers()
            self.wfile.write(b'{"ok":true}'); return

        self.send_response(404); self.end_headers()

if __name__ == "__main__":
    print("AIR hQVM Kernel Bridge + Coordinator — http://localhost:8788")
    print("  GET  /moment /genealogy /status /apertures /ledger")
    print("  POST /step {byte}")
    print("  POST /event_gov {domain, edge_id, magnitude_micro, confidence_micro, meta}")
    print("  POST /grant {identity, mu_allocated}")
    print("  POST /close_shell {header, total_capacity_MU}")
    print("  POST /moment_from_ledger /frame4")
    from http.server import HTTPServer
    HTTPServer(("127.0.0.1",8788), H).serve_forever()
