import mongoose from "mongoose";

export default interface Publication {
  id?: string;
  type: string;
  title: string;
  country: string;
  year: number;
  volume: string;
  group?: string;
  issn: string;
  pages: string;
  doi: string;
  authors: string[];
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
