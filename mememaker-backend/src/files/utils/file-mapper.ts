import { Request } from 'express';

interface FileMapper {
  file_path: string;
  req: Request;
}

export const fileMapper = ({ file_path, req }: FileMapper) => {
  const canva_url = `${req.protocol}://${req.headers.host}/${file_path}`;
  return {canva_url};
};

