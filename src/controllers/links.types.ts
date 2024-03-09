export interface DeleteBody {
  id: number;
}

export interface PatchBody {
  id: number;
  name: string;
  link: string;
}

export interface PostBody {
  name: string;
  link: string;
}
