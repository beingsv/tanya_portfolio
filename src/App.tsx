import type { SectionLink } from './types';
import NavigationBar from './components/NavigationBar/NavigationBar';
import HeroSection from './components/HeroSection/HeroSection';
import EducationTimeline from './components/EducationTimeline/EducationTimeline';
import ResearchSection from './components/ResearchSection/ResearchSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import InterestSection from './components/InterestSection/InterestSection';
import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import ContactFooter from './components/ContactFooter/ContactFooter';
import styles from './App.module.css';

const SECTION_ORDER: SectionLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'interests', label: 'Interests' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

const App: React.FC = () => (
  <>
    <NavigationBar sections={SECTION_ORDER} />
    <main className={styles.main}>
      <HeroSection />
      <EducationTimeline />
      <ResearchSection />
      <SkillsSection />
      <InterestSection />
      <PhotoGallery />
      <ContactFooter />
    </main>
  </>
);

export default App;
