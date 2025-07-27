import StrategicPlan from "./strategicPlan.interface";

export default interface ExternalGroupData {
  name: string;
  url: string;
  strategicPlan: StrategicPlan;
  investigationLines: string[];
}
