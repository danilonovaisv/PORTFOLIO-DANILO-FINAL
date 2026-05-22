// Solid Ghost Blue footer. Italic+bold wordmark lockup.
function SiteFooter() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="section__wrap">
        <div className="footer__top">
          <h2 className="footer__big">
            <em>design</em>
            <strong>como sussurro.</strong>
          </h2>

          <div>
            <div className="footer__col-label">navegar</div>
            <ul className="footer__col-list">
              <li><a href="#home">home</a></li>
              <li><a href="#sobre">sobre</a></li>
              <li><a href="#portfolio">portfólio</a></li>
              <li><a href="#contato">contato</a></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-label">canais</div>
            <ul className="footer__col-list">
              <li><a href="mailto:ola@portfoliodanilo.com"><Mail size={14} stroke={2} />ola@portfoliodanilo.com</a></li>
              <li><a href="tel:+5511900000000"><Phone size={14} stroke={2} />+55 11 9 0000-0000</a></li>
              <li><a href="#"><Globe size={14} stroke={2} />portfoliodanilo.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 · danilo novais · todos os direitos reservados</span>
          <div className="footer__socials">
            <a href="#" aria-label="instagram"><Instagram size={16} stroke={2} /></a>
            <a href="#" aria-label="linkedin"><LinkedIn size={16} stroke={2} /></a>
            <a href="#" aria-label="x (twitter)"><XMark size={14} stroke={2.2} /></a>
            <a href="#" aria-label="facebook"><Facebook size={16} stroke={2} /></a>
          </div>
          <span>ghost system v3.1</span>
        </div>
      </div>
    </footer>
  );
}
window.SiteFooter = SiteFooter;
