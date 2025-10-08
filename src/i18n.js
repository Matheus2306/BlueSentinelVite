import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      Home: "Home",
      Alteracoes: "Alterações",
      PreferenciaDeTema: "Preferência de Tema:",
      Sistema: "Sistema",
      Claro: "Claro",
      Escuro: "Escuro",
      Idioma: "Idioma:",
      Portugues: "Português",
      Ingles: "Inglês",
      Acessibilidade: "Acessibilidade",
      TamanhoDaFonte: "Tamanho da Fonte:",
      LeituraDeTela: "Leitura de tela:",
      SalvarAlteracoes: "Salvar Alterações",
      Nome: "Nome",
      Email: "Email",
      Senha: "Senha",
      ConfirmarSenha: "Confirmar Senha",
      Cadastrar: "Cadastrar",
      TempoDeAtividade: "Tempo de atividade dos drones",
      QuantidadeEmAtiva: "Quantidade em Ativa",
      MudeOFuturo: "Mude o Futuro",
      "Fa%C3%A7aADiferenca": "Faça a diferença para um planeta melhor",
      HeroLead2: "Maior controle sobre o lixo em rios e lagos",
      SaibaMais: "Saiba Mais",
      ImpactoPrincipal: "Impacto Principal",
      Utilizacao: "Utilização",
      ColetaInteligente:
        "Coleta Inteligente: O drone subaquático coleta resíduos sólidos de forma contínua, diminuindo a poluição e melhorando a qualidade da água.",
      DestinacaoSustentavel:
        "Destinação Sustentável: O material coletado é encaminhado para reciclagem, reinserindo resíduos na cadeia produtiva e reduzindo o impacto ambiental.",
      MergulheComAGente:
        "Mergulhe com a gente nessa missão e ajude a transformar nossos rios.",
      InfoTitle: "Combate à urgência",
      InfoParagraph:
        "Observa-se uma crescente urgência em relação ao meio ambiente, especialmente quanto à necessidade de reduzir o acúmulo de resíduos nos rios. A correta remoção e destinação desses materiais contribui para prolongar a vida útil dos corpos hídricos, além de prevenir enchentes e minimizar os impactos socioambientais decorrentes da poluição.",
      ImageAlt: "Imagem de um rio poluído com lixo",
      SubmarineAlt: "Drone subaquático",
      LixoAlt: "Resíduo sólido",
      ReducaoResiduos: "Redução de Resíduos:",
      ContribuicaoODS: "Contribuição com ODS:",
      Engajamento: "Engajamento:",
      Voltar: "Voltar",
      Profile: "Perfil",
      Settings: "Configurações",
      ToggleDarkMode: "Alternar modo escuro",
    },
  },
  en: {
    translation: {
      Home: "Home",
      Alteracoes: "Settings",
      PreferenciaDeTema: "Theme Preference:",
      Sistema: "System",
      Claro: "Light",
      Escuro: "Dark",
      Idioma: "Language:",
      Portugues: "Portuguese",
      Ingles: "English",
      Acessibilidade: "Accessibility",
      TamanhoDaFonte: "Font Size:",
      LeituraDeTela: "Screen reader:",
      SalvarAlteracoes: "Save Changes",
      Nome: "Name",
      Email: "Email",
      Senha: "Password",
      ConfirmarSenha: "Confirm Password",
      Cadastrar: "Register",
      TempoDeAtividade: "Drones activity time",
      QuantidadeEmAtiva: "Active count",
      MudeOFuturo: "Change the Future",
      "Fa%C3%A7aADiferenca": "Make a difference for a better planet",
      HeroLead2: "Better control of river and lake litter",
      SaibaMais: "Learn More",
      ImpactoPrincipal: "Main Impact",
      Utilizacao: "Usage",
      ColetaInteligente:
        "Smart Collection: The underwater drone collects solid waste continuously, reducing pollution and improving water quality.",
      DestinacaoSustentavel:
        "Sustainable Destination: Collected material is sent for recycling, reinserting waste into the production chain and reducing environmental impact.",
      MergulheComAGente:
        "Dive with us on this mission and help transform our rivers.",
      InfoTitle: "Addressing the urgency",
      InfoParagraph:
        "There is a growing urgency regarding the environment, especially the need to reduce waste accumulation in rivers. Proper removal and disposal of these materials helps extend the life of water bodies, prevents floods, and minimizes socio-environmental impacts caused by pollution.",
      ImageAlt: "Image of a polluted river with trash",
      SubmarineAlt: "Underwater drone",
      LixoAlt: "Solid waste",
      ReducaoResiduos: "Waste Reduction:",
      ContribuicaoODS: "Contribution to SDGs:",
      Engajamento: "Engagement:",
      Voltar: "Back",
      Profile: "Profile",
      Settings: "Settings",
      ToggleDarkMode: "Toggle dark mode",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

export default i18n;
