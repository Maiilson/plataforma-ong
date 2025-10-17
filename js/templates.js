// /js/templates.js
export const Templates = {
    home() {
      return `
        <section id="sobre">
          <h2>Sobre Nós</h2>
          <p>A ONG Esperança Viva atua há mais de 10 anos promovendo inclusão social...</p>
          <img src="imagens/voluntarios.jpg" alt="Voluntários em ação social" width="400">
        </section>
        <section id="missao">
          <h2>Missão, Visão e Valores</h2>
          <article>
            <h3>Missão</h3><p>Transformar vidas através de ações sociais sustentáveis.</p>
          </article>
          <article>
            <h3>Visão</h3><p>Ser referência nacional em projetos de impacto social.</p>
          </article>
          <article>
            <h3>Valores</h3>
            <ul><li>Solidariedade</li><li>Transparência</li><li>Comprometimento</li></ul>
          </article>
        </section>
        <section id="contato">
          <h2>Contato</h2>
          <address>
            <p>Email: <a href="mailto:contato@ongesperancaviva.org">contato@ongesperancaviva.org</a></p>
            <p>Telefone: (11) 99999-9999</p>
            <p>Endereço: Rua da Esperança, 123 - São Paulo, SP</p>
          </address>
        </section>
      `;
    },
  
    projetos() {
      return `
        <section id="projetos">
          <h2>Nossos Projetos</h2>
  
          <div class="cards" style="display:flex; gap:16px; flex-wrap:wrap;">
            <article class="card" style="flex:1 1 280px; max-width:360px;">
              <h3>Projeto Sementes do Futuro</h3>
              <figure>
                <img src="imagens/projeto1.jpg" alt="Crianças em reforço escolar" width="360">
                <figcaption>Reforço escolar para crianças da comunidade.</figcaption>
              </figure>
              <p>Educação e cidadania com aulas gratuitas.</p>
              <button class="btn-primary" data-action="quero-ajudar">Quero ajudar</button>
            </article>
  
            <article class="card" style="flex:1 1 280px; max-width:360px;">
              <h3>Projeto Mãos Solidárias</h3>
              <figure>
                <img src="imagens/projeto2.jpg" alt="Distribuição de alimentos" width="360">
                <figcaption>Assistência a famílias carentes.</figcaption>
              </figure>
              <p>Doações e cestas básicas com transparência.</p>
              <button class="btn-primary" data-action="quero-ajudar">Quero ajudar</button>
            </article>
          </div>
  
          <section id="doacoes" style="margin-top:24px;">
            <h2>Como Doar</h2>
            <p>Suas doações mantêm nossos projetos. Clique e transforme vidas.</p>
            <button class="btn-primary" data-action="doar">Fazer Doação</button>
            <img src="imagens/doacao.jpg" alt="Mãos com coração" width="360" style="display:block; margin-top:16px;">
          </section>
        </section>
      `;
    },
  
    cadastro() {
      // O formulário da sua página HTML original será “replicado” aqui para SPA:
      return `
        <section id="cadastro">
          <h2>Cadastro de Voluntários e Doadores</h2>
          <form id="form-cadastro" novalidate>
            <fieldset>
              <legend>Informações Pessoais</legend>
  
              <label for="nome">Nome Completo</label>
              <input type="text" id="nome" name="nome" required placeholder="Seu nome completo" />
  
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" required placeholder="seu@email.com"/>
  
              <label for="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00" />
  
              <label for="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone" required placeholder="(11) 91234-5678"/>
  
              <label for="data">Data de Nascimento</label>
              <input type="date" id="data" name="data" required />
            </fieldset>
  
            <fieldset>
              <legend>Endereço</legend>
  
              <label for="endereco">Endereço</label>
              <input type="text" id="endereco" name="endereco" required placeholder="Rua, número, complemento"/>
  
              <label for="cep">CEP</label>
              <input type="text" id="cep" name="cep" required placeholder="00000-000" />
  
              <label for="cidade">Cidade</label>
              <input type="text" id="cidade" name="cidade" required />
  
              <label for="estado">Estado</label>
              <input type="text" id="estado" name="estado" required maxlength="2" placeholder="SP" />
            </fieldset>
  
            <div aria-live="polite" id="form-feedback" style="min-height:24px; margin-bottom:8px;"></div>
  
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <input type="submit" value="Enviar Cadastro" />
              <input type="reset" value="Limpar Formulário" />
            </div>
          </form>
        </section>
      `;
    }
  };
  