import { TextEffect } from "../../components/motion-primitives/text-effect";
import Navigation from "../components/Navigation";
import { DiagonalFadeGridBackground } from "../components/RadialBackground";

export default function Home() {
  return (
    <>

      <DiagonalFadeGridBackground>
              <Navigation />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <TextEffect
            per="word"
            preset="fade-in-blur"
            className="text-4xl font-bold text-gray-800"
          >
            Portfolio Coming Soon
          </TextEffect>
        </div>
      </DiagonalFadeGridBackground>
    </>
  );
}
