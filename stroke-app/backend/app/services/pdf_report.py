from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def build_pdf(features: dict, p_tab: float, p_img: float, p_final: float) -> bytes:
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    w,h = A4
    y = h-50
    def line(txt):
        nonlocal y
        c.drawString(40,y,txt); y-=18
    c.setTitle("Stroke Prediction Report")
    c.setFont("Helvetica-Bold", 14)
    line("Stroke Prediction Report")
    c.setFont("Helvetica", 11)
    for k,v in features.items():
        line(f"{k}: {v}")
    line(f"Tabular: {p_tab:.3f}")
    line(f"Image: {p_img:.3f}")
    line(f"Ensemble: {p_final:.3f}")
    adv = "Likely Stroke — seek immediate care" if p_final>=0.5 else "Low risk — maintain healthy lifestyle"
    line(f"Advice: {adv}")
    c.showPage(); c.save()
    pdf = buf.getvalue(); buf.close(); return pdf
