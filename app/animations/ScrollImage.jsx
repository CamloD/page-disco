"use client"


import { Parallax } from 'react-parallax';
import styles from '@/app/Styles/ParallaxImage.css';

const ScrollImage = () => {
  return (
    <Parallax
      bgImage="/images/image11.jpg" /* Cambia la ruta de la imagen */
      strength={600} /* Ajusta la fuerza del efecto parallax según sea necesario */
      bgImageStyle={{
        objectFit: 'cover', /* Asegura que la imagen cubra el área del parallax */
        backgroundPosition: 'center center', /* Centra la imagen dentro del contenedor */
      }}
      className={styles.parallax}
    >
      <div style={{ height: '100vh' }}> {/* Ajusta la altura según tus necesidades */}
        <div className={styles.content}>
          {/* Agrega contenido aquí si es necesario */}
        </div>
      </div>
    </Parallax>
  );
};

export default ScrollImage;