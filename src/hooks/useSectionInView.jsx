import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useActiveSectionContext } from '@/context/activeSection';

export function useSectionInView(sectionName,threshold) {
    const { ref, inView } = useInView({
        threshold: threshold
    });
    const { setActiveSection, timeOfLastclick } = useActiveSectionContext();

    useEffect(() => {
        if (inView && Date.now() - timeOfLastclick > 1000) {
            setActiveSection(sectionName);
        }
    }, [inView, setActiveSection, timeOfLastclick, sectionName]);

    return { ref };
}
