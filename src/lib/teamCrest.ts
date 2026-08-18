// Paleta generica (nao aleatoria) pra time que nao esta no TEAM_COLORS
// abaixo - hash simples do nome escolhe o indice, garante cor estavel
// pro mesmo time entre renders/paginas mesmo sem estar cadastrado.
const FALLBACK_PALETTE = [
  '#C62828', // vermelho
  '#1565C0', // azul
  '#2E7D32', // verde
  '#6A1B9A', // roxo
  '#EF6C00', // laranja
  '#00838F', // ciano escuro
  '#AD1457', // rosa escuro
  '#4E342E', // marrom
]

// Cor principal da camisa/identidade de cada clube - curado a mao, nao
// gerado. Cobre os clubes mais tradicionais do futebol brasileiro; time
// que nao estiver aqui cai no FALLBACK_PALETTE acima (hash do nome), entao
// nunca fica sem cor. Onde dois rivais compartilham a mesma familia de cor
// na vida real (varios clubes "vermelho" ou "preto e branco"), o tom exato
// foi escolhido pra continuar diferenciavel no app, sem fugir da cor real.
const TEAM_COLORS: Record<string, string> = {
  // Rio de Janeiro
  'flamengo': '#E30613',
  'vasco da gama': '#171717',
  'vasco': '#171717',
  'botafogo': '#3C3C3C',
  'fluminense': '#7A1E3C',

  // Sao Paulo
  'corinthians': '#000000',
  'palmeiras': '#046A38',
  'sao paulo': '#8B1E2E',
  'santos': '#242424',
  'guarani': '#00612B',
  'ponte preta': '#111111',
  'red bull bragantino': '#B7202E',
  'bragantino': '#B7202E',
  'mirassol': '#FFC72C',
  'botafogo-sp': '#B7202E',
  'sao bernardo': '#F2C21B',
  'novorizontino': '#111111',
  'gremio novorizontino': '#111111',

  // Rio Grande do Sul
  'gremio': '#0D47A1',
  'internacional': '#A6192E',
  'juventude': '#046A38',

  // Minas Gerais
  'atletico mineiro': '#2E2E2E',
  'atletico-mg': '#2E2E2E',
  'cruzeiro': '#003DA5',
  'america mineiro': '#00843D',
  'america-mg': '#00843D',
  'athletic': '#000000',
  'athletic club': '#000000',

  // Bahia / Pernambuco / Alagoas
  'bahia': '#004A8D',
  'vitoria': '#7A0C1E',
  'sport': '#000000',
  'sport recife': '#000000',
  'nautico': '#B7202E',
  'santa cruz': '#B7202E',
  'crb': '#C8102E',

  // Ceara / Nordeste
  'fortaleza': '#1E5AA8',
  'ceara': '#1A1A1A',
  'csa': '#046A38',

  // Parana / Santa Catarina
  'athletico paranaense': '#A31E28',
  'athletico-pr': '#A31E28',
  'coritiba': '#FFFFFF',
  'avai': '#003DA5',
  'chapecoense': '#00843D',
  'criciuma': '#F2C21B',
  'operario': '#000000',
  'operario ferroviario': '#000000',
  'operario-pr': '#000000',
  'londrina': '#1565C0',

  // Goias / Centro-Oeste
  'goias': '#009B4D',
  'cuiaba': '#00843D',
  'atletico goianiense': '#C8202E',

  // Amazonia / Norte
  'remo': '#0A2A5E',
  'paysandu': '#3B9AE1',

  // Grande ABC / interior de Sao Paulo (ja cobertos acima: sao bernardo, novorizontino)
  'vila nova': '#C8102E',
}

export type KitPattern = 'solid' | 'stripes-h' | 'stripes-v' | 'sash' | 'chest-bands'

export type TeamKit = {
  primary: string;
  secondary?: string;
  tertiary?: string;
  pattern: KitPattern;
}

// Padrao da camisa (cores + listras) dos clubes mais iconicos - so' pra
// esses vale a pena desenhar um padrao especifico, os outros caem no
// "solid" com a cor do TEAM_COLORS acima. E' um desenho estilizado, nao
// reproducao de nenhuma arte oficial - cores e listras tem protecao de
// marca muito mais fraca que um escudo/logo.
const TEAM_KITS: Record<string, TeamKit> = {
  // Solida
  'corinthians': { primary: '#FFFFFF', secondary: '#000000', pattern: 'solid' },
  'santos': { primary: '#111111', secondary: '#FFFFFF', pattern: 'solid' },
  'palmeiras': { primary: '#046A38', pattern: 'solid' },
  'cruzeiro': { primary: '#003DA5', pattern: 'solid' },
  'internacional': { primary: '#A6192E', secondary: '#FFFFFF', pattern: 'solid' },
  'remo': { primary: '#0A2A5E', secondary: '#FFFFFF', pattern: 'solid' },
  'chapecoense': { primary: '#046A38', secondary: '#FFFFFF', pattern: 'solid' },
  'operario': { primary: '#000000', secondary: '#FFFFFF', pattern: 'solid' },
  'operario ferroviario': { primary: '#000000', secondary: '#FFFFFF', pattern: 'solid' },
  'operario-pr': { primary: '#000000', secondary: '#FFFFFF', pattern: 'solid' },
  'londrina': { primary: '#1565C0', secondary: '#FFFFFF', pattern: 'solid' },
  'novorizontino': { primary: '#111111', secondary: '#D4AF37', pattern: 'solid' },
  'gremio novorizontino': { primary: '#111111', secondary: '#D4AF37', pattern: 'solid' },
  'vila nova': { primary: '#C8102E', secondary: '#FFFFFF', pattern: 'solid' },
  'criciuma': { primary: '#F2C21B', secondary: '#000000', pattern: 'solid' },

  // Listras horizontais
  'flamengo': { primary: '#E30613', secondary: '#000000', pattern: 'stripes-h' },
  'sport': { primary: '#000000', secondary: '#C8102E', pattern: 'stripes-h' },
  'sport recife': { primary: '#000000', secondary: '#C8102E', pattern: 'stripes-h' },
  'bahia': { primary: '#004A8D', secondary: '#B7202E', pattern: 'stripes-h' },
  'athletic': { primary: '#000000', secondary: '#FFFFFF', pattern: 'stripes-h' },
  'athletic club': { primary: '#000000', secondary: '#FFFFFF', pattern: 'stripes-h' },
  'atletico goianiense': { primary: '#C8202E', secondary: '#000000', pattern: 'stripes-h' },
  'botafogo-sp': { primary: '#FFFFFF', secondary: '#B7202E', pattern: 'stripes-h' },
  'crb': { primary: '#FFFFFF', secondary: '#C8102E', pattern: 'stripes-h' },
  'sao bernardo': { primary: '#F2C21B', secondary: '#111111', pattern: 'stripes-h' },
  'ceara': { primary: '#FFFFFF', secondary: '#1A1A1A', pattern: 'stripes-h' },

  // Listras verticais
  'gremio': { primary: '#0D47A1', secondary: '#000000', pattern: 'stripes-v' },
  'atletico mineiro': { primary: '#000000', secondary: '#FFFFFF', pattern: 'stripes-v' },
  'atletico-mg': { primary: '#000000', secondary: '#FFFFFF', pattern: 'stripes-v' },
  'fluminense': { primary: '#7A1E3C', secondary: '#046A38', pattern: 'stripes-v' },
  'botafogo': { primary: '#000000', secondary: '#FFFFFF', pattern: 'stripes-v' },
  'ponte preta': { primary: '#FFFFFF', secondary: '#111111', pattern: 'stripes-v' },
  'coritiba': { primary: '#FFFFFF', secondary: '#1B8A5A', pattern: 'stripes-v' },
  'athletico paranaense': { primary: '#A31E28', secondary: '#000000', pattern: 'stripes-v' },
  'athletico-pr': { primary: '#A31E28', secondary: '#000000', pattern: 'stripes-v' },
  'paysandu': { primary: '#FFFFFF', secondary: '#3B9AE1', pattern: 'stripes-v' },
  'vitoria': { primary: '#7A0C1E', secondary: '#000000', pattern: 'stripes-v' },

  // Faixa/sash
  'sao paulo': {
    primary: '#FFFFFF',
    secondary: '#B7202E',
    tertiary: '#000000',
    pattern: 'chest-bands',
  },
  'vasco da gama': { primary: '#000000', secondary: '#FFFFFF', pattern: 'sash' },
  'vasco': { primary: '#000000', secondary: '#FFFFFF', pattern: 'sash' },
}

const STOPWORDS = new Set(['de', 'do', 'da', 'dos', 'das', 'e'])

// Registro de escudos reais por nome de time - vazio por enquanto (sem
// fonte licenciada ainda, ver decisao no chat). Quando houver uma fonte
// licita (ex: assinatura paga da TheSportsDB), popular esse mapa com as
// URLs faz o app trocar do badge gerado pro escudo real automaticamente,
// sem mexer em nenhum componente.
export const TEAM_CRESTS: Record<string, string> = {}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getTeamInitials(teamName: string): string {
  const words = teamName
    .trim()
    .split(/\s+/)
    .filter((word) => !STOPWORDS.has(word.toLowerCase()))

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return teamName.trim().slice(0, 3).toUpperCase()
}

export function getTeamColor(teamName: string): string {
  const curated = TEAM_COLORS[normalize(teamName)]
  if (curated) {
    return curated
  }
  return FALLBACK_PALETTE[hashString(teamName) % FALLBACK_PALETTE.length]
}

export function getTeamKit(teamName: string): TeamKit {
  const curated = TEAM_KITS[normalize(teamName)]
  if (curated) {
    return curated
  }
  return { primary: getTeamColor(teamName), pattern: 'solid' }
}

export type TeamCrest = {
  imageUrl?: string;
  initials: string;
  color: string;
  kit: TeamKit;
}

export function getTeamCrest(teamName: string): TeamCrest {
  return {
    imageUrl: TEAM_CRESTS[teamName],
    initials: getTeamInitials(teamName),
    color: getTeamColor(teamName),
    kit: getTeamKit(teamName),
  }
}
