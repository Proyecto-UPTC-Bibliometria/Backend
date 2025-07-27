import StrategicPlan from "../../interfaces/auxiliars/strategicPlan.interface";

// TODO: Add error handling and logging

export default function parseStrategicPlan(text: Element[]) {
  function formatText(text: string): StrategicPlan {
    const normalizedText = text.replace(/\r\n|\r|\n/g, "\n").trim();

    const sections = {
      plan: /Plan de trabajo:\s*(.*?)(?=\n\s*Estado del arte:)/s,
      stateOfArt: /Estado del arte:\s*(.*?)(?=\n\s*Objetivos:)/s,
      objectives: /Objetivos:\s*(.*?)(?=\n\s*Retos:)/s,
      challenges: /Retos:\s*(.*?)(?=\n\s*Visión:|\n\s*Vision:)/s,
      vision: /Visión:\s*(.*)/s,
    };

    const formattedText: StrategicPlan = {
      plan: "",
      stateOfArt: "",
      objectives: "",
      challenges: "",
      vision: "",
    };

    for (const [key, regex] of Object.entries(sections)) {
      const match = normalizedText.match(regex);
      if (match) {
        formattedText[key as keyof StrategicPlan] = match[1]
          .trim()
          .replace(/\s+/g, " ");
      }
    }

    return formattedText;
  }

  const strategicPlan = text[0]?.querySelector("td")?.textContent?.trim() ?? "";

  return formatText(strategicPlan);
}
