export const TRAINING_STATE_RULES = {
  productive: {
    tsbMin: -10,
    tsbMax: 10,
    minActivities: 3,
  },

  building: {
    tsbMin: -20,
    tsbMax: -10,
  },

  peak: {
    tsbMin: 5,
    tsbMax: 20,
  },

  recovering: {
    maxActivities: 2,
  },
} as const