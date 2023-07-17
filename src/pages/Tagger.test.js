import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tagger from "./Tagger";
import PressUploaderContext from "../contexts/PressUploaderContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/** The test has been created emulating the Routing and providing some default input for the Context variables that are normally calculated before the App allows the component to be accessed.
 */
const taggedFiles = [
  {
    date: "00000000",
    source: "label",
    title: "Financiero",
    order: 0,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307160",
  },
  {
    date: "20230704",
    source: "Expansión",
    title:
      "El BCE avisa sobre los riesgos de intervenir el precio de los depósitos",
    order: 1,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307161",
  },
  {
    date: "20230706",
    source: "Expansión",
    title: "Los precios de producción de la eurozona caen a valores negativos",
    order: 2,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307162",
  },
  {
    date: "20230707",
    source: "Expansión",
    title: "La banca prevé otra caída del crédito en el segundo trimestre",
    order: 3,
    session: "20230716",
    zones: [],
    sectors: [],
    tags: [],
    others: [],
    id: "202307163",
  },
];
const previous = [];

const dictionary = {
  sectors: {
    aeroespacial: true,
    aeronáutico: {
      aerolíneas: true,
      aeropuertos: true,
      "industria aeronáutica": true,
    },
    agrario: { vitivinícola: true },
    alimentación: true,
    automovilístico: {
      baterías: true,
      "coche eléctrico": true,
      "segunda mano": true,
    },
    bancario: true,
    comercio: {
      "comercio mayorista": true,
      "comercio minorista": true,
      "comercio online": true,
      delivery: true,
      "gran comercio": true,
      logística: true,
      "pequeño comercio": true,
      supermercados: true,
    },
    construcción: { vivienda: true },
    cárnico: { avícola: true, vacuno: true },
    deporte: true,
    distribución: {
      "centros logísticos": true,
      "grandes superficies": true,
      reparto: true,
      supermercados: true,
    },
    educación: true,
    energía: {
      carbón: true,
      eléctricas: true,
      gas: { fracking: true, gnl: true },
      hidroléctrica: true,
      nuclear: { fisión: true, fusión: true },
      petróleo: { coque: true, fracking: true, gasolina: true, gasóleo: true },
      renovables: {
        eólica: true,
        hidrógeno: {
          "hidrógeno azul": true,
          "hidrógeno dorado": true,
          "hidrógeno verde": true,
        },
        solar: true,
      },
      reservas: true,
      suministro: true,
    },
    industria: { química: true },
    limpieza: true,
    "materias primas": {
      azúcar: true,
      café: true,
      cemento: true,
      cereales: {
        cebada: true,
        girasol: true,
        maíz: true,
        soja: true,
        trigo: true,
      },
      fertilizantes: { potasa: true },
      madera: true,
      metales: {
        aluminio: true,
        cobalto: true,
        cobre: true,
        hierro: true,
        litio: true,
        níquel: true,
        oro: true,
        paladio: true,
        plata: true,
        uranio: true,
        zinc: true,
      },
      té: true,
    },
    "medios de comunicación": {
      cine: true,
      internet: true,
      publicidad: true,
      "redes sociales": true,
      televisión: true,
    },
    minería: true,
    naval: { puertos: true },
    sanidad: { farmacéutico: true, hospitales: true },
    seguros: true,
    siderúrgico: { acero: true, cobre: true },
    tecnología: {
      automatización: true,
      electrónica: true,
      informática: true,
      "inteligencia artificial": true,
      internet: true,
      metaverso: true,
      "redes sociales": true,
      semiconductores: true,
      telecomunicaciones: { "cinco G": true },
      "telefonía móvil": true,
    },
    textil: true,
    transporte: {
      aéreo: true,
      carretera: true,
      contenedores: true,
      ferroviario: true,
      fluvial: true,
      marítimo: true,
      metro: true,
    },
    turismo: { restauración: true },
  },
  tags: {
    acuerdo: true,
    "aglomeración urbana": true,
    "cadena de suministro": {
      abarrotamiento: true,
      almacenaje: true,
      costes: true,
      laboral: true,
      retrasos: true,
      stock: true,
    },
    ciberataques: true,
    "ciencia burguesa": true,
    contaminación: true,
    "control social": {
      adiestramiento: true,
      censura: true,
      "circo parlamentario": { elecciones: true, referéndum: true },
      confinamientos: true,
      drogas: {
        anfetaminas: true,
        cocaína: true,
        heroína: true,
        marihuana: true,
        opioides: true,
      },
      "estado de emergencia": true,
      "falsa izquierda": true,
      nacionalismo: true,
      religión: { evangélicos: true },
      represión: { cárceles: true, delincuencia: true, policía: true },
      "servicios sociales": true,
    },
    crisis: {
      caída: true,
      colapso: true,
      corte: true,
      destrucción: true,
      escasez: true,
      impago: true,
      paralización: true,
      pérdidas: true,
      quiebra: true,
      sobreproducción: false,
    },
    declaraciones: true,
    demografía: {
      mortalidad: true,
      natalidad: true,
      población: true,
      "población activa": true,
    },
    "des-integración": {
      anexión: true,
      brexit: true,
      candidatos: true,
      "prima de riesgo": true,
    },
    "desarrollo productivo": true,
    economía: {
      competencia: true,
      concentración: true,
      crédito: true,
      deflación: true,
      demanda: true,
      descuento: true,
      financiero: {
        "bancos centrales": {
          bce: true,
          bdi: true,
          bdj: true,
          bds: true,
          bpch: true,
          fed: true,
        },
        bonos: {
          dividendos: true,
          "inversión curva": true,
          rendimiento: true,
          volatilidad: true,
        },
        corralito: true,
        depósitos: true,
        deuda: {
          basura: true,
          "deuda basura": true,
          "deuda corporativa": true,
          "deuda estatal": true,
        },
        divisas: {
          bolívar: true,
          dólar: true,
          euro: true,
          "franco suizo": true,
          "libra esterlina": true,
          reservas: true,
          rublo: true,
          rupia: true,
          yen: true,
          yuan: true,
        },
        especulativo: {
          arte: true,
          bolsa: { dividendos: true, recompra: true },
          criptomoneda: true,
          oro: true,
        },
        fondos: true,
        liquidez: true,
        "medio de pago": { swift: true },
        "moneda digital": true,
        oro: true,
        "política monetaria": {
          "compra activos": true,
          reservas: true,
          tipos: true,
        },
        remesas: true,
        tipos: { depósitos: true, interbancario: true },
      },
      hipotecas: true,
      "huida de capitales": true,
      impuestos: { "paraísos fiscales": true },
      indicadores: {
        ahorro: true,
        facturación: true,
        ganancias: true,
        gastos: true,
        ingresos: true,
        pib: true,
        "precios industriales": true,
        pérdidas: true,
        ventas: true,
      },
      inflación: true,
      inversión: true,
      monopolio: true,
      multimillonarios: true,
      multinacionales: true,
      oferta: true,
      pib: true,
      plataformas: true,
      precio: true,
      ralentización: true,
      sanciones: true,
      sobreproducción: { "sobreproducción de capitales": true },
    },
    elco: { "elco-70": true, "elco-71": true },
    "factores climáticos": {
      huracán: true,
      incendios: true,
      sequía: true,
      temperatura: true,
    },
    fronteras: true,
    "fuerzas productivas": {
      automatización: true,
      "capacidad productiva": true,
      "desarrollo productivo": true,
      "reducción de tiempo": true,
    },
    "guerra comercial": {
      aranceles: true,
      proteccionismo: true,
      sanciones: true,
    },
    imperialismo: {
      aislamiento: true,
      ayudas: { reconstrucción: true },
      bloqueo: true,
      desestabilización: true,
      espionaje: true,
      guerra: true,
      "relaciones diplomáticas": true,
      yihadismo: true,
    },
    informe: true,
    infraestructuras: { gasoducto: true, "ruta de la seda": true },
    inmigración: true,
    interclasismo: { mujer: { aborto: true }, racismo: true, sexualidad: true },
    "intervención estatal": {
      ayudas: true,
      juzgados: true,
      "nacionalización-privatización": true,
      presupuesto: true,
    },
    laboral: {
      "asesinato laboral": true,
      conflictos: true,
      desempleo: true,
      despidos: true,
      directivos: true,
      funcionarios: true,
      inspección: true,
      jubilación: true,
      juzgados: true,
      patronal: true,
      pensiones: true,
      "población activa": true,
      "renta básica": true,
      salario: true,
      "sindicalismo subvencionado": true,
      smi: true,
    },
    militar: {
      armamento: {
        drones: true,
        hipersónico: true,
        misiles: true,
        nuclear: true,
        químico: true,
      },
      atentado: true,
      ejército: { reclutamiento: true },
      "fuerzas aéreas": false,
      "fuerzas navales": true,
      "fuerzas terrestres": false,
      maniobras: true,
      mercenarios: true,
      misiles: true,
      "presencia militar": true,
    },
    negociaciones: true,
    "organismos internacionales": {
      aie: true,
      apec: true,
      asean: true,
      bid: true,
      brics: true,
      celac: true,
      fmi: true,
      g20: true,
      g7: true,
      ipef: true,
      nbd: true,
      ocde: true,
      ocs: true,
      omc: true,
      oms: true,
      omt: true,
      onu: true,
      opep: true,
      otan: true,
      quad: true,
    },
    patentes: true,
    "pequeño y gran capital": { "retraso en el pago": true },
    "relaciones comerciales": {
      acuerdo: { ipef: true, mercosur: true, tpp: true },
      "balanza comercial": true,
      déficit: true,
      "import-export": true,
    },
    sanciones: true,
    "situación interna": {
      armamento: { tiroteo: true },
      "condiciones de vida": { "canasta básica": true, residencias: true },
      corrupción: true,
      delincuencia: true,
      desastres: true,
      enfermedades: true,
      enfrentamiento: true,
      estudiantes: true,
      fractura: true,
      "golpe de estado": true,
      "guerra civil": true,
      homicidio: true,
      "paro patronal": true,
      patronal: true,
      "pequeña burguesía": true,
      "pequeño ahorrador": true,
      proletarización: true,
      protestas: true,
      robo: true,
      suicidios: true,
      vivienda: { alquileres: true, deshaucios: true, hipotecas: true },
    },
  },
  zones: {
    américa: {
      caribe: {
        cuba: true,
        haití: true,
        "república dominicana": true,
        "trinidad y tobago": true,
      },
      centroamérica: {
        "costa rica": true,
        "el salvador": true,
        guatemala: true,
        honduras: true,
        nicaragua: true,
        panamá: true,
      },
      latinoamérica: true,
      norteamérica: { canadá: true, eeuu: true, méxico: true },
      suramérica: {
        argentina: true,
        bolivia: true,
        brasil: true,
        chile: true,
        colombia: true,
        ecuador: true,
        guyana: true,
        paraguay: true,
        perú: true,
        surinam: true,
        uruguay: true,
        venezuela: true,
      },
    },
    asia: {
      "asia central": {
        afganistán: true,
        kazajistán: true,
        kirguizistán: true,
        tayikistán: true,
        turkmenistán: true,
        uzbekistán: true,
      },
      "asia pacífico": {
        china: { "hong kong": true, shangai: true, xinjiang: true },
        "corea del norte": true,
        "corea del sur": true,
        filipinas: true,
        japón: true,
        mongolia: true,
        taiwán: true,
      },
      "asia índico": {
        bangladesh: true,
        india: true,
        maldivas: true,
        nepal: true,
        pakistán: true,
        "sri lanka": true,
      },
      cáucaso: {
        armenia: true,
        azerbayán: true,
        georgia: true,
        "osetia del sur": true,
      },
      india: true,
      "oriente medio": {
        "arabia saudí": true,
        eau: true,
        iraq: true,
        irán: true,
        israel: { palestina: true },
        jordania: true,
        kurdistán: true,
        kuwait: true,
        líbano: true,
        omán: true,
        qatar: true,
        siria: true,
        turquía: true,
        yemen: true,
      },
      "sudeste asiático": {
        birmania: true,
        brunéi: true,
        camboya: true,
        indonesia: true,
        laos: true,
        malasia: true,
        singapur: true,
        tailandia: true,
        vietnam: true,
      },
    },
    europa: {
      alemania: true,
      andorra: true,
      austria: true,
      balcanes: {
        albania: true,
        "bosnia-herzegovina": true,
        croacia: true,
        kosovo: true,
        "macedonia del norte": true,
        montenegro: true,
        serbia: true,
      },
      bielorrusia: true,
      bulgaria: true,
      bélgica: true,
      chequia: true,
      chipre: true,
      dinamarca: true,
      eslovaquia: true,
      eslovenia: true,
      españa: { cataluña: true },
      estonia: true,
      finlandia: true,
      francia: true,
      grecia: true,
      hungría: true,
      irlanda: true,
      islandia: true,
      italia: true,
      letonia: true,
      lituania: true,
      luxemburgo: true,
      malta: true,
      moldavia: true,
      noruega: true,
      "países bajos": true,
      polonia: true,
      portugal: true,
      "reino unido": true,
      "república checa": true,
      rumanía: true,
      rusia: { siberia: true },
      schengen: true,
      suecia: true,
      suiza: true,
      transnistria: true,
      ucrania: true,
      ue: true,
    },
    global: true,
    oceania: {
      australia: true,
      "islas del pacífico": true,
      "islas salomón": true,
      "nueva zelanda": true,
    },
    áfrica: {
      angola: true,
      botsuana: true,
      burundi: true,
      camerún: true,
      cedeao: true,
      "costa de marfil": true,
      egipto: true,
      eritrea: true,
      etiopia: true,
      gabón: true,
      gambia: true,
      ghana: true,
      "guinea ecuatorial": true,
      kenia: true,
      malawi: true,
      mozambique: true,
      namibia: true,
      nigeria: true,
      "norte de áfrica": {
        argelia: true,
        egipto: true,
        libia: true,
        marruecos: { "sáhara occidental": true },
        túnez: true,
      },
      "rd congo": true,
      "rep congo": true,
      "república centroafricana": true,
      ruanda: true,
      sahel: {
        "burkina faso": true,
        chad: true,
        "guinea bisáu": true,
        "guinea conakri": true,
        mali: true,
        níger: true,
      },
      senegal: true,
      somalia: true,
      sudáfrica: true,
      sudán: true,
      "sudán del sur": true,
      tanzania: true,
      uganda: true,
      "unión africana": true,
      yibuti: true,
      zambia: true,
      zimbabue: true,
    },
  },
};

describe("Tests for the Tagger page", () => {
  it("Should render an input component with a placeholder", () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );
    const placeholder = screen.getByPlaceholderText(
      /Type a zone, sector or tag.../i
    );
    expect(placeholder).toBeDefined();
  });
  it("Should render a button to reset the dictionary", () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );
    const resetButton = screen.getAllByRole("button", { name: /Reset/i });

    expect(resetButton).toBeDefined();
  });
  it("Should display the text that is written even if it is a keyboard shortcut, when the focus is in the search box", async () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous, dictionary }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );

    const user = userEvent.setup();
    // sends the focus to the search box
    await user.keyboard("f");
    // writes three keyboard shortcut letters
    await user.keyboard("n");
    await user.keyboard("s");
    await user.keyboard("l");
    const searchtext = screen.getByDisplayValue(/nsl/i);
    expect(searchtext).toBeDefined();
  });

  it("Should not display the values in the searchbox if the focus is not in it", async () => {
    render(
      <PressUploaderContext.Provider value={{ taggedFiles, previous }}>
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );

    const user = userEvent.setup();
    await user.keyboard("g");
    // it searches for the placeholder as no new text should have been added
    const placeholder = screen.getByPlaceholderText(
      /Type a zone, sector or tag.../i
    );
    expect(placeholder).toBeDefined();
  });

  it("Should unfold the first level of items of the dictionary when the unfold button is clicked", async () => {
    render(
      <PressUploaderContext.Provider
        value={{ taggedFiles, previous, dictionary }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Tagger />} />
          </Routes>
        </Router>
      </PressUploaderContext.Provider>
    );

    const user = userEvent.setup();

    // gets the first unfoldCheck, corresponding to 'zones'
    const unfoldCheck = screen.getAllByTestId("unfoldCheck")[0];
    // gets the svg in it
    // eslint-disable-next-line testing-library/no-node-access
    const svg = unfoldCheck.querySelector("svg");

    // clicks in the svg
    await user.click(svg);

    // the first level of zones should be displayed
    const unfoldedItem = screen.getByText(Object.keys(dictionary.zones)[0]);
    expect(unfoldedItem).toBeDefined();
  });
});
