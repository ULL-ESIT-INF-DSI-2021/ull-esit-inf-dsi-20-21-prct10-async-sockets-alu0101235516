import {Note} from "./Note_app/Notes/note";

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string,
  title?: string;
  body?: string;
  color?: 'red' | 'blue' | 'yellow' | 'green';
  newParam?: string;
  valParam?: string;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
}

