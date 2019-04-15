<template lang="pug">
  #container
    .pruebaContenedor.w-100.center.tc(v-for="i in 2")
      h1 {{ msg[i-1] }}
      p {{ descripcion }}
      .center.vh-100.pa2-l.pa1(v-bind:id="'gridSpringboard' + i")
        div.site(v-for="site in sitesArray")
          a(v-bind:href="site.url")
            div.title
              img(v-bind:src="getImgUrl(site.favicon)")
              p {{ site.title }}
            div.site-img
              img(v-bind:src="getImgUrl(site.img)" v-bind:title="site.title")

    .pruebaContenedor.w-100.center.tc
      h1 Custom Grid
      #customGrid.center.vh-100.pa2-l.pa1
        div(v-for="n in 12", v-bind:class="'item'+n")
          h1 {{n}}
</template>

<script>
import dataSites from "@/assets/data/sites.json";
export default {
  name: "home",
  data() {
    return {
      min: "",  // Sitio inicial
      max: "",  // Sitio final
      lmax: "", // Cantidad de sitios
      dataS: "",  // Información cargada de sites.json
      sitesArray: "", // Arreglo de sitios
      images: null, // Imagenes utilizadas (assets/images/widgets)
      msg: ["Patrón Springboard", "Patrón Springboard - Una columna"],
      descripcion: "El patrón Springboard, también llamado Launchpad, fue el "+
        "patrón de navegación más popular en 2011. Este diseño es una pantalla"+
        " de inicio con opciones que actúan como puntos de inicio en la "+
        "aplicación."
    };
  },
  methods: {
    /**
     * Función que genera un entero aleatorio en el rango [a,b].
     * @param {number} a  Límite inferior del rango.
     * @param {number} b  Límite superior del rango.
     * @returns Entero aleatorio entre a y b.
     */
    aleatorio: function(a, b) {
      return Math.round(Math.random() * (b - a) + parseInt(a));
    },
    /**
     * Función que carga los sitios web almacenados en el archivo json.
     */
    loadJsonSites: function() {
      this.dataS = dataSites;
    },
    /**
     * Función que establece la configuración del Springboard.
     */
    setSettings: function() {
      this.min = this.dataS["settings"][0]["min"]; // Sitio inicial
      this.max = this.dataS["settings"][0]["max"]; // Sitio final
      this.lmax = this.dataS["settings"][0]["lmax"]; // Número de sitios
    },
    /**
     * Función que establece el arreglo de sitios a utilizar.
     */
    setSitesArray: function() {
      this.sitesArray = this.dataS["sitesArray"];
    },
    /**
     * Función que carga todas las imágenes png/jpg almacenadas en la carpeta
     * assets/images/widgets/ y las guarda en data.images.
     */
    loadImages: function() {
      this.images = require.context("../assets/images/widgets/", false,
        /\.(png|jpg)$/);
    },
    /**
     * Función que obtiene la ruta de una imagen a partir de su nombre.
     * @param {string} img  Nombre de la imagen a obtener.
     * @returns String con la ruta de la imagen.
     */
    getImgUrl: function(img) {
      return this.images("./" + img);
    }
  },
  mounted() {
    this.loadJsonSites(); // Se carga la información de los sitios
    this.setSettings();   // Actualizamos la configuración
    this.setSitesArray(); // Llenamos el arreglo de sitios
    this.loadImages();    // Cargamos imágenes a utilizar
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
//styles
.pruebaContenedor {
  border: 1px solid $orange;
  .unamGoldColor.bold {
    font-weight: 900;
  }
  .unamGoldColor {
    color: $gold;
    &.bold {
      font-weight: 600;
    }
  }
  /* Springboard principal */
  #gridSpringboard1 {
    display: grid;
    background-image: url("../assets/images/widgets/springboard-bg.jpg");
    background-size: 100% 100%;
    width: 98%;
    grid-template-columns: repeat(4, 24%);
    grid-template-rows: repeat(3, 32%);
    grid-gap: 1.3%;
    grid-row-gap: 2%;
    border: 1px solid $blue;
    overflow-wrap: break-word;
  }
  /* Contenedor de cada sitio */
  .site {
    background-color: #fbfbfb;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 16px 33px -21px black;
    cursor: pointer;
    transition: transform 0.25s;

    a {
      text-decoration: none;
      color: inherit;
      border-radius: inherit;

      /* Titulo del sitio */
      .title {
        height: 20px;
        background-color: #f1f4f6;
        border-radius: inherit;
        font-size: 14px;
        overflow: hidden;
        padding: 2px 5% 2px 6px;
        text-overflow: ellipsis;
        text-align: left;
        white-space: nowrap;

        /* Favicon */
        img {
          object-fit: cover;
          height: 98%;
        }
        /* Texto del titulo */
        p {
          display: inline;
          margin-left: 10px;
          vertical-align: top;
        }
      }

      /* Contenedor de la imagen del sitio */
      .site-img {
        display: flex;
        height: 89%;

        /* Imagen del sitio */
        img {
          width: 90%;
          max-height: 85%;
          margin: auto;
          padding: 10px;
          object-fit: cover;
        }
      }
    }
  }

  /* Contenedor de cada sitio en hover */
  .site:hover {
    transform: scale(1.01);
  }

  /* Springboard principal con pantalla menor o igual a 767px */
  @media (max-width: 767px) {
    #gridSpringboard1 {
      height: 200vh;
      grid-template-columns: repeat(2, 49%);
      grid-template-rows: repeat(6, 16%);
      grid-gap: 1.3%;
      grid-row-gap: 0.8%;
    }
  }

  /* Springboard principal con pantalla de 768px a 1024px */
  @media (min-width: 768px) and (max-width: 1024px) {
    #gridSpringboard1 {
      height: calc(400vh / 3);
      grid-template-columns: repeat(3, 32%);
      grid-template-rows: repeat(4, 24%);
      grid-gap: 2%;
      grid-row-gap: 1.3%;
    }
  }

  /* Springboard principal con pantalla de min 1025px X 450px */
  @media (min-width: 1025px) and (max-height: 450px) {
    #gridSpringboard1 {
      height: calc(595vh / 4);
    }
  }

  /* Springboard principal con pantalla de max 1025px X 450px */
  @media (max-width: 1024px) and (max-height: 450px) {
    #gridSpringboard1 {
      height: calc(595vh / 3);
    }
  }

  /* Springboard principal con pantalla de max 767px X 450px */
  @media (max-width: 767px) and (max-height: 450px) {
    #gridSpringboard1 {
      height: calc(595vh / 2);
    }
  }

  /* Springboard de una sola columna */
  #gridSpringboard2 {
    display: grid;
    background-image: url("../assets/images/widgets/springboard-bg.jpg");
    background-size: 100% 100%;
    width: 30%;
    height: 400vh;
    grid-template-columns: 7% 86% 7%;
    grid-template-rows: repeat(12, 8%);
    grid-row-gap: 0.37%;
    border: 1px solid $blue;
    overflow-wrap: break-word;

    /* Contenedor de cada sitio */
    .site {
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  /* Springboard de una sola columna con pantalla de ancho de hasta 600px */
  @media (max-width: 600px) {
    #gridSpringboard2 {
      width: 65%;
    }
  }

  /* Springboard de una sola columna con pantalla de ancho de 601px a 767px */
  @media (min-width: 601px) and (max-width: 767px) {
    #gridSpringboard2 {
      width: 50%;
    }
  }

  /* Springboard de una sola columna con pantalla de ancho de 768px a 1024px */
  @media (min-width: 768px) and (max-width: 1024px) {
    #gridSpringboard2 {
      width: 40%;
    }
  }
  /* Springboard de una sola columna con pantalla de altura de hasta 450px */
  @media (max-height: 450px) {
    #gridSpringboard2 {
      height: 640vh;
    }
  }

  /* Grid para el ejercicio 4 */
  #customGrid {
    display: grid;
    background-image: url("../assets/images/widgets/springboard-bg.jpg");
    background-size: 100% 100%;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(6, auto);

    div {
      border: 1px solid $blue;
    }

    .item1 {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }
    .item2, .item3 {
      grid-column: 3 / 5;
    }
    .item5 {
      grid-column: 2 / 4;
    }
    .item7 {
      grid-column: 1 / 3;
    }
    .item8 {
      grid-column: 3 / 5;
      grid-row: 4 / 6;
    }
    .item12 {
      grid-column: 2 / 5;
    }
  }
}
</style>
