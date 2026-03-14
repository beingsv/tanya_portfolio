import useCarousel from '../../hooks/useCarousel';
import { gallery } from '../../data/gallery';
import styles from './PhotoGallery.module.css';

const PhotoGallery: React.FC = () => {
  const { currentIndex, next, prev, handlers } = useCarousel({
    totalItems: gallery.length,
    visibleCount: 1,
  });

  if (gallery.length === 0) return null;

  const photo = gallery[currentIndex];

  return (
    <section id="gallery" className={styles.section} data-testid="photo-gallery">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Gallery</h2>
        <div className={styles.carouselWrapper} {...handlers}>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={prev}
            aria-label="Previous photo"
            type="button"
          >
            &#8249;
          </button>
          <div className={styles.imageWrapper}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.image}
              data-testid={`gallery-slide-${photo.id}`}
            />
            <p className={styles.counter}>
              {currentIndex + 1} / {gallery.length}
            </p>
          </div>
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={next}
            aria-label="Next photo"
            type="button"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
