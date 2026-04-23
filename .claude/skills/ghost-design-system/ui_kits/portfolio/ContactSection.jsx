// Light inversion — #f0f0f0 bg, dark text, Ghost Blue punctuation only.
function ContactSection() {
  return (
    <section className="contact" id="contato" data-screen-label="Contact">
      <div className="section__wrap">
        <div className="section__eyebrow">
          <span className="num">04</span>
          <span>contato · inversão de luz</span>
        </div>
        <h2 className="contact__title">
          vamos <em>conversar</em> sobre o próximo projeto.
        </h2>
        <p className="contact__lede">
          briefings curtos, respostas diretas. me chame por qualquer um dos
          canais abaixo — ou clique no botão para abrir o e-mail já preenchido.
        </p>

        <a className="contact__bigcta" href="mailto:ola@portfoliodanilo.com">
          <span>abrir conversa por e-mail</span>
          <span className="orb" aria-hidden="true">
            <ArrowUpRight size={20} stroke={2.5} />
          </span>
        </a>

        <div className="contact__grid">
          <div className="contact__col">
            <span className="contact__col-label">e-mail</span>
            <span className="contact__col-value">ola@portfoliodanilo.com</span>
            <span className="contact__col-sub">resposta em até 24h úteis</span>
          </div>
          <div className="contact__col">
            <span className="contact__col-label">telefone</span>
            <span className="contact__col-value">+55 11 9 0000-0000</span>
            <span className="contact__col-sub">whatsapp · seg–sex 10–19h</span>
          </div>
          <div className="contact__col">
            <span className="contact__col-label">base</span>
            <span className="contact__col-value">são paulo · br</span>
            <span className="contact__col-sub">remoto para qualquer lugar</span>
          </div>
          <div className="contact__col">
            <span className="contact__col-label">disponibilidade</span>
            <span className="contact__col-value">q2 2026</span>
            <span className="contact__col-sub">agendando novos briefings</span>
          </div>
        </div>
      </div>
    </section>
  );
}
window.ContactSection = ContactSection;
