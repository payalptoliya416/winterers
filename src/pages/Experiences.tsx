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
        eyebrow="WINTER EXPERIENCES"
        title={
          <>
            Experience Winter <br />
            <span className="text-[#7EC8E3]">Like Never Before</span>
          </>
        }
        text="From northern lights and mountain adventures to cozy escapes and unforgettable snowy moments, discover experiences made for people who truly love winter."
      >
        <Button variant="light" size="lg" to="/stays" pill>
          View Winter Stays
        </Button>
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
