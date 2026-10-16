import Hero from '../components/Hero';
import Button from '../components/Button';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { selectSorted } from '../store/staysSlice';
import { Experiences as Exp } from '../components/Blocks';
import NorthernLightsFeature from '../components/NorthernLightsFeature';
import CuratedExperiencesSlider from '../components/CuratedExperiencesSlider';
import ExperienceSpotlight from '../components/ExperienceSpotlight';

export default function Experiences() {
  const s = useSelector(selectSorted);

  return (
    <>
      <Hero
        name="hero-exp.png"
        eyebrow="Winter experiences"
        title="Experience Winter"
        accent="Like Never Before"
        text="From northern lights and mountain adventures to cosy escapes and unforgettable snowy moments."
      >
        <Button variant="light">Explore Experiences</Button>
        <Button variant="ghost" to="/stays">Find Your Stay</Button>
      </Hero>

      <Exp
        eyebrow="Explore experiences"
        title="Choose Your Winter Experience"
        sub="Find the kind of winter adventure that matches the way you want to travel."
      />

      <NorthernLightsFeature />

      <CuratedExperiencesSlider stays={s} />

      <ExperienceSpotlight />
    </>
  );
}
