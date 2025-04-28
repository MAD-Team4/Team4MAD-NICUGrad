// nicu_grad_frontend/app/components/fakeGrowthData.js

export const generateFakeGrowthData = (days = 7) => {
    const labels = [];
    const values = [];
  
    const startWeight = 3000; // grams
    let currentWeight = startWeight;
  
    for (let i = 0; i < days; i++) {
      labels.push(`Day ${i + 1}`);
      // Random weight change between -20g and +30g
      const change = Math.floor(Math.random() * 50) - 20;
      currentWeight += change;
      values.push(currentWeight);
    }
  
    return {
      labels,
      values,
    };
  };
  