const sections = [
  {
    title: '1) Soil Health Assessment',
    questions: [
      {
        key: 'q1_1',
        label: '1.1 Which one of the following best describes the crop cover and living roots in this farm?',
        options: [
          "Fields remain bare post-harvest; no cover or living roots.",
          "Occasional cover or volunteer growth left unintentionally.",
          "Cover crops used in some seasons",
          "Cover crops used intentionally and consistently on most plots.",
          "Diverse, multi-species cover crops maintained year-round for continuous soil cover and living roots"
        ]
      },
      {
        key: 'q1_2',
        label: '1.2 Which one of the following best describes the tillage practices in this farm?',
        options: [
          "Conventional deep tillage used regularly.",
          "Occasional reduced tillage in select plots.",
          "Reduced tillage used across many.",
          "Minimum tillage applied consistently.",
          "No-till or minimal disturbance practiced with specialized tools; soil structure well-preserved."
        ]
      },
      {
        key: 'q1_3',
        label: '1.3 Which one of the following best describes the Soil Amendments practices in this farm?',
        options: [
          "No compost or organic inputs; only synthetic fertilizers used.",
          "Some compost used, often externally sourced.",
          "Own-farm compost applied to a few plots.",
          "Regular application of well-prepared compost/farmyard manure.",
          "Integrated system using compost, bioinputs, and soil biology enhancement (e.g.jeevamrit/vermicompost)."
        ]
      }
    ]
  },
  {
    title: '2) Biodiversity & Crop Management',
    questions: [
      {
        key: 'q2_1',
        label: '2.1 Which one of the following best describes the Crop Rotation & Diversity practices in this farm?',
        options: [
          "Mono-cropping followed throughout.",
          "Rotation done once in a while, with limited diversity.",
          "Seasonal rotation practiced with 2 – 3 crops",
          "Intentional multi-season rotation with diverse crops.",
          "Polyculture/intercropping used, integrating trees or perennial species where possible."
        ]
      },
      {
        key: 'q2_2',
        label: '2.2 Which one of the following best describes the Use of Indigenous or Resilient Seeds practices in this farm?',
        options: [
          "Fully dependent on hybrid or GM seeds.",
          "One indigenous variety grown occasionally.",
          "Mix of commercial and local seeds used.",
          "Local/open-pollinated seeds preferred for most crops.",
          "Community-led seed saving and breeding practiced for diverse, climate-resilient crops."
        ]
      }
    ]
  },
  {
    title: '3) Pest, Disease and Input Management',
    questions: [
      {
        key: 'q3_1',
        label: '3.1 Which one of the following best describes the Use of Chemical Pesticides practices in this farm?',
        options: [
          "Regular use of chemical pesticides and herbicides.",
          "Reduced chemical sprays in some plots.",
          "Mixed use of chemicals and natural sprays.",
          "Fully transitioned to natural/bio pest control (e.g. neem, cow-based).",
          "Ecological pest management with habitat enhancement (e.g. trap crops, predators)"
        ]
      },
      {
        key: 'q3_2',
        label: '3.2 Which one of the following best describes the Input Reliance practices in this farm?',
        options: [
          "Fully dependent on external inputs (seeds, fertilizers, pesticides).",
          "Some homemade inputs used.",
          "Use of jeevamrit/panchagavya on select plots.",
          "Most inputs prepared on-farm with natural materials.",
          "Complete input self-reliance with community-level sharing and training."
        ]
      }
    ]
  },
  {
    title: '4) Integration of Livestock',
    questions: [
      {
        key: 'q4_1',
        label: '4.1 Which one of the following best describes the Livestock Integration with Cropping Systems practices in this farm?',
        options: [
          "No livestock or completely separated from crops.",
          "Livestock present but not integrated into farm system.",
          "Manure used occasionally on fields",
          "Livestock and crop systems managed to support each other.",
          "Full integration: rotational grazing, manure used for composting, fodder crops grown."
        ]
      },
      {
        key: 'q4_2',
        label: '4.2 Which one of the following best describes the Livestock Grazing practices in this farm?',
        options: [
          "Free grazing without management.",
          "Stall-fed or tethered grazing, no rotation.",
          "Some paddock or rotational grazing practiced.",
          "Managed rotational grazing with rest periods for recovery.",
          "Holistic grazing with pasture improvement and high biomass regeneration."
        ]
      }
    ]
  },
  {
    title: '5) Water & Soil Moisture Management',
    questions: [
      {
        key: 'q5_1',
        label: '5.1 Which one of the following best describes the Rainwater Harvesting & Groundwater Recharge practices in this farm?',
        options: [
          "No rainwater harvesting structures.",
          "Basic bunding or trenches with minimal impact.",
          "Farm ponds or check dams on parts of the farm.",
          "Effective farm-level harvesting structures maintained.",
          "Integrated recharge system with soil moisture, ponds, and runoff control."
        ]
      },
      {
        key: 'q5_2',
        label: '5.2 Which one of the following best describes the Soil Moisture Conservation practices in this farm?',
        options: [
          "Water runs off quickly; no moisture management.",
          "Mulching done occasionally.",
          "Regular mulching or compost used for moisture.",
          "Water-saving practices like furrow planting adopted.",
          "Contour bunds, cover crops, mulch, and soil structure ensure year-round moisture."
        ]
      }
    ]
  }
];

export default sections;
