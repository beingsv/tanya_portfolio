import { contact } from '../../data/contact';
import styles from './ContactFooter.module.css';

const ContactFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer} data-testid="contact-footer">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Get in Touch</h2>

        <a
          href={`mailto:${contact.email}`}
          className={styles.email}
          data-testid="contact-email"
        >
          {contact.email}
        </a>

        <nav className={styles.links} aria-label="Social and academic links">
          {contact.links.map((link) =>
            link.url ? (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-testid={`contact-link-${link.platform.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.platform}
              </a>
            ) : (
              <span
                key={link.platform}
                className={styles.pendingLink}
                data-testid={`contact-link-${link.platform.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.platform} (Coming Soon)
              </span>
            )
          )}
        </nav>

        <p className={styles.copyright} data-testid="copyright-notice">
          &copy; {currentYear} {contact.email.split('@')[0].replace('.', ' ')}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ContactFooter;
