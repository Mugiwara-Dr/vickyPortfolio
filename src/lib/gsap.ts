import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";

// Register once — imported everywhere else from here
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Observer);
}

export { gsap, ScrollTrigger, SplitText, Observer };
export default gsap;
