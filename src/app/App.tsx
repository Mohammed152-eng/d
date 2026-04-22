import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Waves, Trash2, Fish, AlertTriangle, TrendingDown, Droplets, Anchor, Shell, Activity, Download, ArrowRight, Skull, Zap, Target } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import pptxgen from 'pptxgenjs';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 11;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const downloadPowerPoint = async () => {
    const pptx = new pptxgen();

    // Set presentation properties
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'BUE Student';
    pptx.title = 'Plastic Pollution in Marine Environments';

    // Helper function to fetch and convert image to base64
    const getImageAsBase64 = async (url: string): Promise<string> => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Error loading image:', error);
        return '';
      }
    };

    // Slide 1: Title Slide
    let slide1 = pptx.addSlide();
    slide1.background = { fill: '001a33' };
    slide1.transition = { type: 'fade', duration: 1 };

    // Background gradient overlay
    slide1.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: '100%',
      fill: { type: 'solid', color: '001a33', transparency: 20 }
    });

    // BUE Logo Circle (animated)
    slide1.addShape(pptx.ShapeType.ellipse, {
      x: 0.5, y: 0.5, w: 1, h: 1,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    // BUE Text
    slide1.addText('BUE', {
      x: 1.7, y: 0.6, w: 2, h: 0.4,
      fontSize: 18, bold: true, color: 'FFFFFF'
    });
    slide1.addText('British University in Egypt', {
      x: 1.7, y: 0.95, w: 3, h: 0.3,
      fontSize: 11, color: 'CCCCCC'
    });

    // Student Info
    slide1.addText('Student Name: [Your Name]\nStudent ID: [Your ID]', {
      x: 7.5, y: 0.5, w: 2.3, h: 0.8,
      fontSize: 11, color: 'FFFFFF', align: 'right'
    });

    // Water droplet icon (using shape)
    slide1.addShape(pptx.ShapeType.ellipse, {
      x: 4.5, y: 1.5, w: 0.8, h: 0.8,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    // Main Title (with animation)
    slide1.addText('Primary Causes of Plastic Pollution\nin Shallow Marine Environments', {
      x: 0.5, y: 2.8, w: 9, h: 1.2,
      fontSize: 48, bold: true, color: 'FFFFFF', align: 'center',
      shadow: { type: 'outer', blur: 10, offset: 5, angle: 45, color: '000000', opacity: 0.5 }
    });

    // Underline decoration
    slide1.addShape(pptx.ShapeType.rect, {
      x: 4.2, y: 4.1, w: 1.6, h: 0.08,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    // Subtitle
    slide1.addText('Effects on Small Marine Ecosystems & Biodiversity', {
      x: 0.5, y: 4.5, w: 9, h: 0.6,
      fontSize: 28, color: '00D9FF', align: 'center'
    });

    // Footer
    slide1.addText('Environmental Science | April 2026', {
      x: 0.5, y: 5.3, w: 9, h: 0.4,
      fontSize: 16, color: 'AAAAAA', align: 'center'
    });

    // Slide 2: Introduction
    let slide2 = pptx.addSlide();
    slide2.background = { fill: '001a33' };
    slide2.transition = { type: 'push', duration: 0.8 };

    // Load and add coral image
    const coralImg = await getImageAsBase64('https://images.unsplash.com/photo-1770535849202-8e42411cf3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHklMjBtYXJpbmUlMjBsaWZlfGVufDF8fHx8MTc3Njg4MjUxOHww&ixlib=rb-4.1.0&q=80&w=1080');
    if (coralImg) {
      slide2.addImage({
        data: coralImg,
        x: 0.5, y: 1.5, w: 4.5, h: 3.5,
        rounding: true
      });
    }

    // 8M stat box
    slide2.addShape(pptx.ShapeType.roundRect, {
      x: 4.2, y: 4.2, w: 1.5, h: 1,
      fill: { type: 'solid', color: 'FF6B6B' },
      line: { type: 'none' }
    });
    slide2.addText('8M', {
      x: 4.2, y: 4.3, w: 1.5, h: 0.5,
      fontSize: 36, bold: true, color: 'FFFFFF', align: 'center'
    });
    slide2.addText('tons of plastic/year', {
      x: 4.2, y: 4.75, w: 1.5, h: 0.3,
      fontSize: 11, color: 'FFFFFF', align: 'center'
    });

    // Title
    slide2.addText('Introduction', {
      x: 5.5, y: 0.8, w: 4, h: 0.7,
      fontSize: 44, bold: true, color: 'FFFFFF'
    });

    // Bullet points (with animations)
    const bullets2 = [
      'Shallow marine ecosystems are critically threatened',
      'Plastic pollution disrupts delicate ecological balance',
      'Urgent action needed to protect marine biodiversity'
    ];

    bullets2.forEach((text, i) => {
      slide2.addText(text, {
        x: 5.5, y: 2 + i * 0.7, w: 4, h: 0.6,
        fontSize: 20, color: 'FFFFFF', bullet: { code: '2022' }
      });
    });

    slide2.addText('(Derraik, 2002; Jambeck et al., 2015)', {
      x: 5.5, y: 5, w: 4, h: 0.3,
      fontSize: 11, color: '888888', italic: true
    });

    // Slide 3: Transition "What Causes This Crisis?"
    let slide3 = pptx.addSlide();
    slide3.background = { fill: '003d5c' };
    slide3.transition = { type: 'zoom', duration: 1 };

    // Center circle with glow
    slide3.addShape(pptx.ShapeType.ellipse, {
      x: 4, y: 2, w: 2, h: 2,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'solid', color: '00D9FF', width: 0.3 },
      shadow: { type: 'outer', blur: 40, offset: 0, angle: 0, color: '00D9FF', opacity: 0.8 }
    });

    slide3.addText('What Causes This Crisis?', {
      x: 1, y: 4.3, w: 8, h: 0.8,
      fontSize: 48, bold: true, color: 'FFFFFF', align: 'center'
    });

    // Slide 4: Primary Causes
    let slide4 = pptx.addSlide();
    slide4.background = { fill: '003d5c' };
    slide4.transition = { type: 'push', duration: 0.8 };

    slide4.addText('Primary Causes', {
      x: 0.5, y: 0.5, w: 9, h: 0.7,
      fontSize: 52, bold: true, color: 'FFFFFF', align: 'center'
    });

    // Underline
    slide4.addShape(pptx.ShapeType.rect, {
      x: 4.4, y: 1.3, w: 1.2, h: 0.06,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    const causes = [
      { title: 'Coastal Waste Dumping', desc: 'Direct disposal from land-based sources', color: 'FF6B6B', x: 0.7, y: 2.2 },
      { title: 'Ghost Fishing Gear', desc: 'Abandoned nets & equipment entanglement', color: 'FFA500', x: 5.3, y: 2.2 },
      { title: 'Microplastic Sources', desc: 'Cosmetics, textiles & degraded plastics', color: '00D9FF', x: 0.7, y: 4.2 },
      { title: 'Tourism & Recreation', desc: 'Beach litter & marine-based activities', color: '9B59B6', x: 5.3, y: 4.2 }
    ];

    causes.forEach((cause) => {
      // Card background
      slide4.addShape(pptx.ShapeType.roundRect, {
        x: cause.x, y: cause.y, w: 4, h: 1.6,
        fill: { type: 'solid', color: '1A1A1A', transparency: 70 },
        line: { type: 'solid', color: 'FFFFFF', width: 0.02, transparency: 80 }
      });

      // Icon circle
      slide4.addShape(pptx.ShapeType.roundRect, {
        x: cause.x + 0.3, y: cause.y + 0.2, w: 0.8, h: 0.8,
        fill: { type: 'solid', color: cause.color },
        line: { type: 'none' }
      });

      // Title
      slide4.addText(cause.title, {
        x: cause.x + 0.2, y: cause.y + 1.1, w: 3.6, h: 0.3,
        fontSize: 20, bold: true, color: 'FFFFFF'
      });

      // Description
      slide4.addText(cause.desc, {
        x: cause.x + 0.2, y: cause.y + 1.45, w: 3.6, h: 0.3,
        fontSize: 15, color: '00D9FF'
      });
    });

    slide4.addText('(Thompson et al., 2004; Cole et al., 2011)', {
      x: 0.5, y: 5.9, w: 9, h: 0.2,
      fontSize: 10, color: '888888', italic: true, align: 'center'
    });

    // Slide 5: Transition "The Devastating Effects"
    let slide5 = pptx.addSlide();
    slide5.background = { fill: '001a33' };
    slide5.transition = { type: 'zoom', duration: 1 };

    // Warning triangle
    slide5.addShape(pptx.ShapeType.triangle, {
      x: 4, y: 1.5, w: 2, h: 2,
      fill: { type: 'solid', color: 'FF0000' },
      line: { type: 'none' },
      shadow: { type: 'outer', blur: 50, offset: 0, angle: 0, color: 'FF0000', opacity: 0.9 }
    });

    slide5.addText('The Devastating Effects', {
      x: 1, y: 4, w: 8, h: 0.8,
      fontSize: 48, bold: true, color: 'FFFFFF', align: 'center'
    });

    // Slide 6: Ecosystem Effects
    let slide6 = pptx.addSlide();
    slide6.background = { fill: '001a33' };
    slide6.transition = { type: 'push', duration: 0.8 };

    slide6.addText('Ecosystem Effects', {
      x: 0.5, y: 0.5, w: 9, h: 0.7,
      fontSize: 52, bold: true, color: 'FFFFFF', align: 'center'
    });

    slide6.addShape(pptx.ShapeType.rect, {
      x: 4.4, y: 1.3, w: 1.2, h: 0.06,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    // Load images
    const turtleImg = await getImageAsBase64('https://images.unsplash.com/photo-1770274167037-0a8ecc5894dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzZWElMjB0dXJ0bGUlMjBvY2VhbiUyMGNvbnNlcnZhdGlvbnxlbnwxfHx8fDE3NzY4ODI1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080');
    const garbageImg = await getImageAsBase64('https://images.unsplash.com/photo-1632247620837-970aa94d2b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxvY2VhbiUyMHBsYXN0aWMlMjBwb2xsdXRpb24lMjB1bmRlcndhdGVyfGVufDF8fHx8MTc3Njg4MjUxN3ww&ixlib=rb-4.1.0&q=80&w=1080');
    const coralImg2 = await getImageAsBase64('https://images.unsplash.com/photo-1770535849226-e0c37c47607e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHklMjBtYXJpbmUlMjBsaWZlfGVufDF8fHx8MTc3Njg4MjUxOHww&ixlib=rb-4.1.0&q=80&w=1080');

    const effectsData = [
      { img: turtleImg, title: 'Ingestion', desc: 'Marine life mistakes plastic for food', x: 0.8, color: 'FF0000' },
      { img: garbageImg, title: 'Entanglement', desc: 'Nets and debris trap organisms', x: 3.7, color: 'FFA500' },
      { img: coralImg2, title: 'Habitat Smothering', desc: 'Plastics block light & oxygen flow', x: 6.6, color: 'FFD700' }
    ];

    effectsData.forEach((effect) => {
      if (effect.img) {
        // Circular image
        slide6.addImage({
          data: effect.img,
          x: effect.x, y: 2, w: 2.2, h: 2.2,
          sizing: { type: 'cover', w: 2.2, h: 2.2 },
          rounding: true
        });
      }

      // Warning icon overlay
      slide6.addShape(pptx.ShapeType.ellipse, {
        x: effect.x + 1.6, y: 1.85, w: 0.5, h: 0.5,
        fill: { type: 'solid', color: effect.color },
        line: { type: 'solid', color: 'FFFFFF', width: 0.05 }
      });

      // Title
      slide6.addText(effect.title, {
        x: effect.x, y: 4.4, w: 2.2, h: 0.4,
        fontSize: 22, bold: true, color: 'FFFFFF', align: 'center'
      });

      // Description
      slide6.addText(effect.desc, {
        x: effect.x - 0.2, y: 4.85, w: 2.6, h: 0.5,
        fontSize: 15, color: '00D9FF', align: 'center'
      });
    });

    slide6.addText('(Wright et al., 2013; Rochman et al., 2015)', {
      x: 0.5, y: 5.8, w: 9, h: 0.2,
      fontSize: 10, color: '888888', italic: true, align: 'center'
    });

    // Slide 7: Biodiversity Impact
    let slide7 = pptx.addSlide();
    slide7.background = { fill: '003d5c' };
    slide7.transition = { type: 'push', duration: 0.8 };

    slide7.addText('Biodiversity Impact', {
      x: 0.5, y: 0.6, w: 4.5, h: 0.7,
      fontSize: 44, bold: true, color: 'FFFFFF'
    });

    const biodiversityItems = [
      { title: 'Species Decline', desc: 'Loss of keystone & endemic species', color: 'FF0000', y: 1.8 },
      { title: 'Ecosystem Imbalance', desc: 'Disrupted predator-prey relationships', color: 'FFA500', y: 2.7 },
      { title: 'Genetic Diversity Loss', desc: 'Reduced population resilience', color: 'FFD700', y: 3.6 },
      { title: 'Invasive Species', desc: 'Plastic rafts transport non-native organisms', color: '9B59B6', y: 4.5 }
    ];

    biodiversityItems.forEach((item) => {
      slide7.addShape(pptx.ShapeType.rect, {
        x: 0.1, y: item.y, w: 0.15, h: 0.7,
        fill: { type: 'solid', color: item.color },
        line: { type: 'none' }
      });

      slide7.addShape(pptx.ShapeType.roundRect, {
        x: 0.5, y: item.y, w: 4.2, h: 0.7,
        fill: { type: 'solid', color: '1A1A1A', transparency: 80 },
        line: { type: 'none' }
      });

      slide7.addText(item.title, {
        x: 0.7, y: item.y + 0.1, w: 3.8, h: 0.3,
        fontSize: 20, bold: true, color: 'FFFFFF'
      });

      slide7.addText(item.desc, {
        x: 0.7, y: item.y + 0.42, w: 3.8, h: 0.25,
        fontSize: 15, color: '00D9FF'
      });
    });

    // Before/After comparison
    const healthyCoralImg = await getImageAsBase64('https://images.unsplash.com/photo-1770535849155-050e10d51295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHklMjBtYXJpbmUlMjBsaWZlfGVufDF8fHx8MTc3Njg4MjUxOHww&ixlib=rb-4.1.0&q=80&w=1080');
    const pollutedBeachImg = await getImageAsBase64('https://images.unsplash.com/photo-1569254983547-44dc559f038f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaWNyb3BsYXN0aWNzJTIwcG9sbHV0aW9uJTIwYmVhY2h8ZW58MXx8fHwxNzc2ODgyNTE4fDA&ixlib=rb-4.1.0&q=80&w=1080');

    slide7.addText('HEALTHY ECOSYSTEM', {
      x: 5.2, y: 0.8, w: 4, h: 0.3,
      fontSize: 12, bold: true, color: '00FF00'
    });

    if (healthyCoralImg) {
      slide7.addImage({
        data: healthyCoralImg,
        x: 5.2, y: 1.2, w: 4, h: 1.8,
        rounding: true
      });
    }

    slide7.addText('POLLUTED ECOSYSTEM', {
      x: 5.2, y: 3.4, w: 4, h: 0.3,
      fontSize: 12, bold: true, color: 'FF0000'
    });

    if (pollutedBeachImg) {
      slide7.addImage({
        data: pollutedBeachImg,
        x: 5.2, y: 3.8, w: 4, h: 1.8,
        rounding: true
      });
    }

    slide7.addText('(Kühn et al., 2015; Gregory, 2009)', {
      x: 0.5, y: 5.8, w: 4.5, h: 0.2,
      fontSize: 10, color: '888888', italic: true
    });

    // Slide 8: Cause → Effect Chain
    let slide8 = pptx.addSlide();
    slide8.background = { fill: '001a33' };
    slide8.transition = { type: 'push', duration: 0.8 };

    slide8.addText('Cause → Effect Chain', {
      x: 0.5, y: 0.5, w: 9, h: 0.7,
      fontSize: 52, bold: true, color: 'FFFFFF', align: 'center'
    });

    slide8.addShape(pptx.ShapeType.rect, {
      x: 4.4, y: 1.3, w: 1.2, h: 0.06,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    // Flow boxes
    const flowItems = [
      { label: 'POLLUTION\nSOURCES', sublabel: 'Waste, nets, microplastics', color: 'FF6B6B', x: 1 },
      { label: 'ECOSYSTEM\nDAMAGE', sublabel: 'Ingestion, entanglement', color: 'FFA500', x: 4 },
      { label: 'BIODIVERSITY\nLOSS', sublabel: 'Species extinction, imbalance', color: '9B59B6', x: 7 }
    ];

    flowItems.forEach((item, i) => {
      slide8.addShape(pptx.ShapeType.roundRect, {
        x: item.x, y: 2.3, w: 2, h: 1.2,
        fill: { type: 'solid', color: item.color },
        line: { type: 'none' },
        shadow: { type: 'outer', blur: 20, offset: 0, angle: 0, color: item.color, opacity: 0.5 }
      });

      slide8.addText(item.label, {
        x: item.x, y: 2.5, w: 2, h: 0.6,
        fontSize: 18, bold: true, color: 'FFFFFF', align: 'center'
      });

      slide8.addText(item.sublabel, {
        x: item.x, y: 3.15, w: 2, h: 0.3,
        fontSize: 11, color: 'FFFFFF', align: 'center'
      });

      if (i < 2) {
        slide8.addText('→', {
          x: item.x + 2.2, y: 2.7, w: 0.6, h: 0.5,
          fontSize: 40, color: '00D9FF', align: 'center'
        });
      }
    });

    // Supporting details
    slide8.addShape(pptx.ShapeType.roundRect, {
      x: 1, y: 4.2, w: 8, h: 1.2,
      fill: { type: 'solid', color: '1A1A1A', transparency: 90 },
      line: { type: 'solid', color: 'FFFFFF', width: 0.02, transparency: 80 }
    });

    const details = [
      'Land-based waste enters ocean daily',
      'Habitats suffocated, organisms harmed',
      'Entire species populations collapse'
    ];

    details.forEach((text, i) => {
      slide8.addText(text, {
        x: 1.5 + i * 2.5, y: 4.6, w: 2.2, h: 0.4,
        fontSize: 14, color: 'FFFFFF', align: 'center'
      });
    });

    // Slide 9: Impact Scale
    let slide9 = pptx.addSlide();
    slide9.background = { fill: '003d5c' };
    slide9.transition = { type: 'zoom', duration: 1 };

    slide9.addText('The Scale of Impact', {
      x: 0.5, y: 0.5, w: 9, h: 0.7,
      fontSize: 52, bold: true, color: 'FFFFFF', align: 'center'
    });

    slide9.addShape(pptx.ShapeType.rect, {
      x: 4.4, y: 1.3, w: 1.2, h: 0.06,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    const stats = [
      { value: '100K+', label: 'Marine animals die yearly', color: 'FF6B6B', x: 0.8, y: 2 },
      { value: '80%', label: 'Ocean plastic from land', color: 'FFA500', x: 5.2, y: 2 },
      { value: '450yrs', label: 'Plastic degradation time', color: '9B59B6', x: 0.8, y: 4 },
      { value: '50%', label: 'Reef damage from pollution', color: '00D9FF', x: 5.2, y: 4 }
    ];

    stats.forEach((stat) => {
      slide9.addShape(pptx.ShapeType.roundRect, {
        x: stat.x, y: stat.y, w: 4, h: 1.5,
        fill: { type: 'solid', color: stat.color },
        line: { type: 'none' },
        shadow: { type: 'outer', blur: 30, offset: 0, angle: 0, color: stat.color, opacity: 0.6 }
      });

      slide9.addText(stat.value, {
        x: stat.x, y: stat.y + 0.2, w: 4, h: 0.7,
        fontSize: 52, bold: true, color: 'FFFFFF', align: 'center'
      });

      slide9.addText(stat.label, {
        x: stat.x, y: stat.y + 0.95, w: 4, h: 0.4,
        fontSize: 18, color: 'FFFFFF', align: 'center'
      });
    });

    slide9.addText('(UNEP, 2021; Ocean Conservancy, 2022)', {
      x: 0.5, y: 5.8, w: 9, h: 0.2,
      fontSize: 10, color: '888888', italic: true, align: 'center'
    });

    // Slide 10: Conclusion
    let slide10 = pptx.addSlide();
    slide10.background = { fill: '005f73' };
    slide10.transition = { type: 'fade', duration: 1 };

    slide10.addText('Conclusion', {
      x: 0.5, y: 0.6, w: 9, h: 0.7,
      fontSize: 52, bold: true, color: 'FFFFFF', align: 'center'
    });

    slide10.addShape(pptx.ShapeType.rect, {
      x: 4.4, y: 1.4, w: 1.2, h: 0.06,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    slide10.addShape(pptx.ShapeType.roundRect, {
      x: 1, y: 2, w: 8, h: 2,
      fill: { type: 'solid', color: '1A1A1A', transparency: 80 },
      line: { type: 'solid', color: 'FFFFFF', width: 0.02, transparency: 70 }
    });

    const conclusions = [
      'Plastic pollution poses existential threat to marine biodiversity',
      'Multi-faceted approach required: prevention, cleanup & restoration',
      'Immediate action essential to preserve shallow marine ecosystems'
    ];

    conclusions.forEach((text, i) => {
      slide10.addText(text, {
        x: 1.5, y: 2.3 + i * 0.5, w: 7, h: 0.4,
        fontSize: 20, color: 'FFFFFF', bullet: { code: '2022' }
      });
    });

    // References section
    slide10.addShape(pptx.ShapeType.roundRect, {
      x: 1, y: 4.3, w: 8, h: 1.3,
      fill: { type: 'solid', color: '003d5c', transparency: 50 },
      line: { type: 'solid', color: '00D9FF', width: 0.02, transparency: 50 }
    });

    slide10.addText('References (APA)', {
      x: 1.2, y: 4.4, w: 7.6, h: 0.3,
      fontSize: 18, bold: true, color: 'FFFFFF'
    });

    const references = `Cole, M., et al. (2011). Marine Pollution Bulletin, 62(12), 2588-2597.
Derraik, J. G. (2002). Marine Pollution Bulletin, 44(9), 842-852.
Gregory, M. R. (2009). Phil. Trans. Royal Society B, 364(1526), 2013-2025.
Jambeck, J. R., et al. (2015). Science, 347(6223), 768-771.
Rochman, C. M., et al. (2015). Marine Pollution Bulletin, 97(1-2), 5-12.`;

    slide10.addText(references, {
      x: 1.2, y: 4.75, w: 7.6, h: 0.8,
      fontSize: 10, color: '00D9FF', lineSpacing: 14
    });

    // Slide 11: Thank You
    let slide11 = pptx.addSlide();
    slide11.background = { fill: '001a33' };
    slide11.transition = { type: 'fade', duration: 1 };

    // Center circle glow
    slide11.addShape(pptx.ShapeType.ellipse, {
      x: 4, y: 2, w: 2, h: 2,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' },
      shadow: { type: 'outer', blur: 60, offset: 0, angle: 0, color: '00D9FF', opacity: 0.9 }
    });

    slide11.addText('Thank You', {
      x: 1, y: 4.3, w: 8, h: 0.8,
      fontSize: 64, bold: true, color: 'FFFFFF', align: 'center'
    });

    slide11.addShape(pptx.ShapeType.rect, {
      x: 3.5, y: 5.2, w: 3, h: 0.08,
      fill: { type: 'solid', color: '00D9FF' },
      line: { type: 'none' }
    });

    slide11.addText('Questions & Discussion', {
      x: 1, y: 5.4, w: 8, h: 0.4,
      fontSize: 24, color: '00D9FF', align: 'center'
    });

    slide11.addText('Together, we can protect our oceans', {
      x: 1, y: 5.9, w: 8, h: 0.3,
      fontSize: 16, color: 'AAAAAA', align: 'center'
    });

    // Save the presentation
    await pptx.writeFile({ fileName: 'Marine_Plastic_Pollution_Presentation.pptx' });
  };

  const slides = [
    <TitleSlide key="title" />,
    <IntroSlide key="intro" />,
    <TransitionSlide1 key="trans1" />,
    <CausesSlide key="causes" />,
    <TransitionSlide2 key="trans2" />,
    <EffectsSlide key="effects" />,
    <BiodiversitySlide key="biodiversity" />,
    <AnalysisSlide key="analysis" />,
    <ImpactVisualization key="impact" />,
    <ConclusionSlide key="conclusion" />,
    <ThankYouSlide key="thanks" />
  ];

  return (
    <div className="size-full bg-gradient-to-br from-[#001a33] via-[#003d5c] to-[#005f73] overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            animate={{
              y: [0, -1000],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: '100%'
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 1.05, rotateY: 10 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="size-full"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Download Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={downloadPowerPoint}
        className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full text-white font-bold shadow-2xl hover:scale-105 transition-all z-50"
      >
        <Download className="w-5 h-5" />
        Download PPT
      </motion.button>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
        <button
          onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => currentSlide < totalSlides - 1 && setCurrentSlide(prev => prev + 1)}
          disabled={currentSlide === totalSlides - 1}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 text-white/60 text-sm z-50">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="size-full flex flex-col items-center justify-center px-16 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(0, 217, 255, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Background Image */}
      <div className="absolute inset-0 opacity-15">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1719754519931-0e5763a44d36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxvY2VhbiUyMHBsYXN0aWMlMjBwb2xsdXRpb24lMjB1bmRlcndhdGVyfGVufDF8fHx8MTc3Njg4MjUxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ocean pollution background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* BUE Logo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="absolute top-8 left-8 text-white"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
          >
            <Waves className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <div className="font-bold text-xl">BUE</div>
            <div className="text-xs opacity-80">British University in Egypt</div>
          </div>
        </div>
      </motion.div>

      {/* Student Info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="absolute top-8 right-8 text-right text-white"
      >
        <div className="text-sm">Student Name: [Your Name]</div>
        <div className="text-sm opacity-80">Student ID: [Your ID]</div>
      </motion.div>

      {/* Main Title with Particles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
        className="text-center z-10 max-w-5xl"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block mb-6"
        >
          <Droplets className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_30px_rgba(0,217,255,0.8)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
        >
          Primary Causes of Plastic Pollution<br />
          in Shallow Marine Environments
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"
        />

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-4xl text-cyan-300 mb-8"
        >
          Effects on Small Marine Ecosystems & Biodiversity
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-white/70 text-lg"
        >
          Environmental Science | April 2026
        </motion.p>
      </motion.div>

      {/* Floating Fish */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-32 left-16 opacity-20"
      >
        <Fish className="w-40 h-40 text-cyan-400" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-40 right-24 opacity-20"
      >
        <Shell className="w-32 h-32 text-blue-400" />
      </motion.div>
    </div>
  );
}

function TransitionSlide1() {
  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="text-center z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-40 h-40 text-cyan-400 mx-auto mb-8 drop-shadow-[0_0_50px_rgba(0,217,255,0.9)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold text-white"
        >
          What Causes This Crisis?
        </motion.h2>
      </motion.div>

      {/* Ripple Effect */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400/30 rounded-full"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 800 + i * 200,
            height: 800 + i * 200,
            opacity: 0
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6
          }}
        />
      ))}
    </div>
  );
}

function IntroSlide() {
  return (
    <div className="size-full flex items-center justify-center px-16 relative overflow-hidden">
      <div className="grid grid-cols-2 gap-12 max-w-7xl w-full z-10">
        {/* Left: Visual */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateZ: 2 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/30"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1770535849202-8e42411cf3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHklMjBtYXJpbmUlMjBsaWZlfGVufDF8fHx8MTc3Njg4MjUxOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Coral reef biodiversity"
              className="w-full h-[500px] object-cover"
            />
          </motion.div>

          {/* Animated Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -bottom-6 -right-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl p-8 shadow-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-6xl font-bold"
            >
              8M
            </motion.div>
            <div className="text-white/90 text-sm">tons of plastic/year</div>
          </motion.div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 mb-8"
          >
            <motion.div
              animate={{ rotateZ: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Waves className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <h2 className="text-6xl font-bold text-white">Introduction</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              'Shallow marine ecosystems are critically threatened',
              'Plastic pollution disrupts delicate ecological balance',
              'Urgent action needed to protect marine biodiversity'
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.2 }}
                className="flex items-start gap-4 group"
              >
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="w-3 h-3 rounded-full bg-cyan-400 mt-3 group-hover:shadow-[0_0_20px_rgba(0,217,255,0.8)]"
                />
                <motion.p
                  whileHover={{ x: 10 }}
                  className="text-white text-2xl leading-relaxed"
                >
                  {text}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/50 text-sm mt-8"
          >
            (Derraik, 2002; Jambeck et al., 2015)
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

function CausesSlide() {
  const causes = [
    { icon: Trash2, title: 'Coastal Waste Dumping', desc: 'Direct disposal from land-based sources', color: 'from-red-500 to-pink-600' },
    { icon: Anchor, title: 'Ghost Fishing Gear', desc: 'Abandoned nets & equipment entanglement', color: 'from-orange-500 to-yellow-600' },
    { icon: Droplets, title: 'Microplastic Sources', desc: 'Cosmetics, textiles & degraded plastics', color: 'from-blue-500 to-cyan-600' },
    { icon: Activity, title: 'Tourism & Recreation', desc: 'Beach litter & marine-based activities', color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <div className="size-full flex flex-col items-center justify-center px-16 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-center mb-12"
      >
        <h2 className="text-7xl font-bold text-white mb-4">Primary Causes</h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl w-full z-10">
        {causes.map((cause, index) => {
          const Icon = cause.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.6 + index * 0.15,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group cursor-pointer"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 h-full relative overflow-hidden"
                whileHover={{ borderColor: 'rgba(0, 217, 255, 0.5)' }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${cause.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                />

                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cause.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">{cause.title}</h3>
                <p className="text-cyan-200 text-lg">{cause.desc}</p>

                {/* Animated Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.15 }}
                  className="absolute right-8 bottom-8"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-white/50 text-sm mt-8 z-10"
      >
        (Thompson et al., 2004; Cole et al., 2011)
      </motion.p>
    </div>
  );
}

function TransitionSlide2() {
  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-48 h-48 text-red-500 mx-auto mb-8 drop-shadow-[0_0_60px_rgba(255,0,0,0.9)]" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold text-white"
        >
          The Devastating Effects
        </motion.h2>
      </motion.div>

      {/* Pulsing Circles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-500/30 rounded-full"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 600 + i * 150,
            height: 600 + i * 150,
            opacity: 0
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
}

function EffectsSlide() {
  const effects = [
    {
      img: 'https://images.unsplash.com/photo-1770274167037-0a8ecc5894dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzZWElMjB0dXJ0bGUlMjBvY2VhbiUyMGNvbnNlcnZhdGlvbnxlbnwxfHx8fDE3NzY4ODI1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Ingestion',
      desc: 'Marine life mistakes plastic for food',
      color: 'red'
    },
    {
      img: 'https://images.unsplash.com/photo-1632247620837-970aa94d2b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxvY2VhbiUyMHBsYXN0aWMlMjBwb2xsdXRpb24lMjB1bmRlcndhdGVyfGVufDF8fHx8MTc3Njg4MjUxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Entanglement',
      desc: 'Nets and debris trap organisms',
      color: 'orange'
    },
    {
      img: 'https://images.unsplash.com/photo-1770535849226-e0c37c47607e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHklMjBtYXJpbmUlMjBsaWZlfGVufDF8fHx8MTc3Njg4MjUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Habitat Smothering',
      desc: 'Plastics block light & oxygen flow',
      color: 'yellow'
    }
  ];

  return (
    <div className="size-full flex items-center justify-center px-16 relative overflow-hidden">
      <div className="max-w-7xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-7xl font-bold text-white mb-4">Ecosystem Effects</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-3 gap-10">
          {effects.map((effect, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.7, type: 'spring' }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                className="relative mb-6"
              >
                <motion.div
                  className={`w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-${effect.color}-500 shadow-2xl`}
                  whileHover={{ borderWidth: 8 }}
                >
                  <ImageWithFallback
                    src={effect.img}
                    alt={effect.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.2, type: 'spring' }}
                  className={`absolute -top-3 -right-3 bg-${effect.color}-500 rounded-full p-4 shadow-lg`}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.2 }}
                className="text-3xl font-bold text-white mb-3"
              >
                {effect.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.2 }}
                className="text-cyan-200 text-lg"
              >
                {effect.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-12 grid grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/30"
          >
            <Skull className="w-10 h-10 text-red-400 mb-3" />
            <p className="text-white text-xl">Toxic chemical accumulation in food webs</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
          >
            <TrendingDown className="w-10 h-10 text-purple-400 mb-3" />
            <p className="text-white text-xl">Reduced reproductive success rates</p>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-white/50 text-sm mt-8 text-center"
        >
          (Wright et al., 2013; Rochman et al., 2015)
        </motion.p>
      </div>
    </div>
  );
}

function BiodiversitySlide() {
  return (
    <div className="size-full flex items-center justify-center px-16 relative overflow-hidden">
      <div className="grid grid-cols-2 gap-12 max-w-7xl w-full z-10">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="flex items-center gap-3 mb-8"
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Fish className="w-14 h-14 text-cyan-400" />
            </motion.div>
            <h2 className="text-6xl font-bold text-white">Biodiversity Impact</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { title: 'Species Decline', desc: 'Loss of keystone & endemic species', color: 'red' },
              { title: 'Ecosystem Imbalance', desc: 'Disrupted predator-prey relationships', color: 'orange' },
              { title: 'Genetic Diversity Loss', desc: 'Reduced population resilience', color: 'yellow' },
              { title: 'Invasive Species', desc: 'Plastic rafts transport non-native organisms', color: 'purple' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className={`bg-gradient-to-r from-${item.color}-500/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border-l-4 border-${item.color}-500 cursor-pointer`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-cyan-200 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/50 text-sm mt-8"
          >
            (Kühn et al., 2015; Gregory, 2009)
          </motion.p>
        </motion.div>

        {/* Right: Visual Comparison */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
        >
          <div className="space-y-6">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-green-400 text-sm font-bold mb-3 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-green-400"
                />
                HEALTHY ECOSYSTEM
              </div>
              <motion.div
                whileHover={{ scale: 1.05, rotateZ: -2 }}
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-green-400"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1770535849155-050e10d51295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHklMjBtYXJpbmUlMjBsaWZlfGVufDF8fHx8MTc3Njg4MjUxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthy coral reef"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <TrendingDown className="w-16 h-16 text-red-400 mx-auto drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]" />
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="text-red-400 text-sm font-bold mb-3 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-red-400"
                />
                POLLUTED ECOSYSTEM
              </div>
              <motion.div
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-400"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1569254983547-44dc559f038f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaWNyb3BsYXN0aWNzJTIwcG9sbHV0aW9uJTIwYmVhY2h8ZW58MXx8fHwxNzc2ODgyNTE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Beach pollution"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AnalysisSlide() {
  return (
    <div className="size-full flex flex-col items-center justify-center px-16 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-center mb-16"
      >
        <h2 className="text-7xl font-bold text-white mb-4">Cause → Effect Chain</h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"
        />
      </motion.div>

      <div className="max-w-7xl w-full z-10">
        {/* Flow Diagram - Horizontal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-16"
        >
          {/* Pollution Sources */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.1, y: -10 }}
            className="flex-1 text-center cursor-pointer"
          >
            <motion.div
              animate={{ rotateZ: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 rounded-3xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(255,0,0,0.5)]"
            >
              <Trash2 className="w-16 h-16 text-white" />
            </motion.div>
            <p className="text-white text-2xl font-bold">POLLUTION<br/>SOURCES</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-cyan-200 text-sm mt-2"
            >
              Waste, nets, microplastics
            </motion.p>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex-shrink-0 px-8"
          >
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-20 h-20 text-cyan-400" />
            </motion.div>
          </motion.div>

          {/* Ecosystem Damage */}
          <motion.div
            initial={{ opacity: 0, y: -100, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.1, y: -10 }}
            className="flex-1 text-center cursor-pointer"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(255,165,0,0.5)]"
            >
              <AlertTriangle className="w-16 h-16 text-white" />
            </motion.div>
            <p className="text-white text-2xl font-bold">ECOSYSTEM<br/>DAMAGE</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-cyan-200 text-sm mt-2"
            >
              Ingestion, entanglement
            </motion.p>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex-shrink-0 px-8"
          >
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <ArrowRight className="w-20 h-20 text-cyan-400" />
            </motion.div>
          </motion.div>

          {/* Biodiversity Loss */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.1, y: -10 }}
            className="flex-1 text-center cursor-pointer"
          >
            <motion.div
              animate={{ rotateZ: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(147,51,234,0.5)]"
            >
              <TrendingDown className="w-16 h-16 text-white" />
            </motion.div>
            <p className="text-white text-2xl font-bold">BIODIVERSITY<br/>LOSS</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-cyan-200 text-sm mt-2"
            >
              Species extinction, imbalance
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Supporting Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/20"
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Zap className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-white text-lg">Land-based waste enters ocean daily</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Zap className="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <p className="text-white text-lg">Habitats suffocated, organisms harmed</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-white text-lg">Entire species populations collapse</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ImpactVisualization() {
  return (
    <div className="size-full flex items-center justify-center px-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl w-full z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-7xl font-bold text-white mb-4">The Scale of Impact</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8">
          {[
            { value: '100K+', label: 'Marine animals die yearly', color: 'from-red-500 to-orange-600', delay: 0.6 },
            { value: '80%', label: 'Ocean plastic from land', color: 'from-orange-500 to-yellow-600', delay: 0.8 },
            { value: '450yrs', label: 'Plastic degradation time', color: 'from-purple-500 to-pink-600', delay: 1.0 },
            { value: '50%', label: 'Reef damage from pollution', color: 'from-blue-500 to-cyan-600', delay: 1.2 }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotateZ: -45 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ delay: stat.delay, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="cursor-pointer"
            >
              <motion.div
                className={`bg-gradient-to-br ${stat.color} rounded-3xl p-10 text-center shadow-2xl`}
                whileHover={{ boxShadow: '0 0 60px rgba(0,217,255,0.4)' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="text-white text-7xl font-bold mb-4"
                >
                  {stat.value}
                </motion.div>
                <p className="text-white/90 text-xl">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-white/50 text-sm mt-8 text-center"
        >
          (UNEP, 2021; Ocean Conservancy, 2022)
        </motion.p>
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 opacity-10"
      >
        <Fish className="w-48 h-48 text-cyan-400" />
      </motion.div>
    </div>
  );
}

function ConclusionSlide() {
  return (
    <div className="size-full flex flex-col items-center justify-center px-16 py-12 relative overflow-hidden">
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-center mb-12"
        >
          <h2 className="text-7xl font-bold text-white mb-6">Conclusion</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"
          />
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/20 mb-8"
        >
          <div className="space-y-8">
            {[
              'Plastic pollution poses existential threat to marine biodiversity',
              'Multi-faceted approach required: prevention, cleanup & restoration',
              'Immediate action essential to preserve shallow marine ecosystems'
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.2 }}
                whileHover={{ x: 20, scale: 1.02 }}
                className="flex items-start gap-4 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.5, rotate: 360 }}
                  className="w-4 h-4 rounded-full bg-cyan-400 mt-3 flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,217,255,0.8)]"
                />
                <p className="text-white text-2xl leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 max-h-64 overflow-y-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-6">References (APA)</h3>
          <div className="space-y-3 text-cyan-200 text-sm leading-relaxed">
            <p>Cole, M., Lindeque, P., Halsband, C., & Galloway, T. S. (2011). Microplastics as contaminants in the marine environment. <em>Marine Pollution Bulletin, 62</em>(12), 2588-2597.</p>
            <p>Derraik, J. G. (2002). The pollution of the marine environment by plastic debris. <em>Marine Pollution Bulletin, 44</em>(9), 842-852.</p>
            <p>Gregory, M. R. (2009). Environmental implications of plastic debris in marine settings. <em>Philosophical Transactions of the Royal Society B, 364</em>(1526), 2013-2025.</p>
            <p>Jambeck, J. R., et al. (2015). Plastic waste inputs from land into the ocean. <em>Science, 347</em>(6223), 768-771.</p>
            <p>Kühn, S., Bravo Rebolledo, E. L., & van Franeker, J. A. (2015). Deleterious effects of litter on marine life. <em>Marine Anthropogenic Litter</em>, 75-116.</p>
            <p>Ocean Conservancy. (2022). <em>International Coastal Cleanup Report</em>. Washington, DC.</p>
            <p>Rochman, C. M., et al. (2015). The ecological impacts of marine debris. <em>Marine Pollution Bulletin, 97</em>(1-2), 5-12.</p>
            <p>Thompson, R. C., et al. (2004). Lost at sea: Where is all the plastic? <em>Science, 304</em>(5672), 838.</p>
            <p>UNEP. (2021). <em>From Pollution to Solution: A Global Assessment of Marine Litter and Plastic Pollution</em>. Nairobi: United Nations Environment Programme.</p>
            <p>Wright, S. L., Thompson, R. C., & Galloway, T. S. (2013). The physical impacts of microplastics on marine organisms. <em>Environmental Pollution, 178</em>, 483-492.</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 opacity-5"
      >
        <Waves className="w-96 h-96 text-cyan-400" />
      </motion.div>
    </div>
  );
}

function ThankYouSlide() {
  return (
    <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(0, 95, 115, 0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.2) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-8"
        >
          <Waves className="w-32 h-32 text-cyan-400 mx-auto drop-shadow-[0_0_50px_rgba(0,217,255,0.9)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-8xl font-bold text-white mb-6"
        >
          Thank You
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="h-2 w-48 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto mb-8 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-cyan-300 text-3xl mb-12"
        >
          Questions & Discussion
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-white/60 text-lg"
        >
          <p>Together, we can protect our oceans</p>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 360
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          {i % 2 === 0 ? (
            <Fish className="w-16 h-16 text-cyan-400/20" />
          ) : (
            <Shell className="w-12 h-12 text-blue-400/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
