# MaskingGenerator

Browser page that bakes **geometric Mondrian-*like* mask frames** (random rectangles, circles, or triangles on a gray canvas) and downloads them as a ZIP of PNGs. Intended as a lightweight baker for **CFS / RMS-style** work, not as a stimulus-analysis or experiment-presentation tool.

That “Mondrian-*like*” wording is geometric resemblance only. CFS itself is [Tsuchiya & Koch, 2005](https://doi.org/10.1038/nn1500); controlled mask construction and analysis live in tools such as [CFS-crafter](https://doi.org/10.3758/s13428-022-01903-7) (Wang, Alais, Blake, & Han, 2022). This repo does not replace those sources.

Live page: https://nadavweisler.github.io/MaskingGenerator/

## What it does

* Pick one shape type (rectangle, circle, or triangle), a frame count, a shape count, and canvas / shape sizes.
* Draw each frame by placing that many randomly positioned, randomly colored shapes on a dark-gray background.
* Download the frames as `shapes.zip` (`mask0.png`, `mask1.png`, …).

Sizes in the current UI are **canvas units**, not a research-grade size model. Do not treat them as millimetres, screen centimetres, or visual angle.

## What it does not do

* **No spectral control.** No spatial-, temporal-, or orientation-frequency design or filtering.
* **No analysis.** No mask statistics, spectra, or comparison against other stimuli.
* **No calibrated visual angle.** No viewing-distance, PPI, or display calibration.
* **Not an experiment runner.** It does not present CFS/RMS trials, time masks at ~10 Hz, or log responses.
* **Not a first / canonical Mondrian generator.** Earlier bakers exist (see [Related work](#related-work)).
* **Known limit (triangles).** Rotated triangles can grow a bounding box larger than the declared W×H, so the fit check is incomplete for triangles.

## Related work

**Primary sources (cite these for the method and for controlled masks):**

* Tsuchiya, N., & Koch, C. (2005). Continuous flash suppression reduces negative afterimages. *Nature Neuroscience, 8*(8), 1096–1101. https://doi.org/10.1038/nn1500
* Wang, G., Alais, D., Blake, R., & Han, S. (2022). CFS-crafter: An open-source tool for creating and analyzing images for continuous flash suppression experiments. *Behavior Research Methods*. https://doi.org/10.3758/s13428-022-01903-7

**Prior bakers (this page is another small one, not a replacement):**

* [nadavWeisler/jsPsychRmsPlugin](https://github.com/nadavWeisler/jsPsychRmsPlugin) — jsPsych RMS/bRMS plugin with its own Mondrian-mask baker.
* [ronenno1/masks4cfs](https://github.com/ronenno1/masks4cfs) — MATLAB script that writes triangle-based CFS mask PNGs.

## Usage

1. Clone the repository, or open the [live page](https://nadavweisler.github.io/MaskingGenerator/).
2. Open `index.html` in a browser.
3. Choose shape type, frame count, shape count, and sizes.
4. Click **Generate & Download**.

## Stack

HTML, CSS, JavaScript, jQuery, [JSZip](https://stuk.github.io/jszip/).

## License

[MIT](LICENSE). See [`CITATION.md`](CITATION.md) for how to cite this repo versus the primary CFS / CFS-crafter papers.
