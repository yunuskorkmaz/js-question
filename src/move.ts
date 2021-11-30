type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: Array<File>;
};

export type List = Array<Folder>;

export default function move(list: List, source: string, destination: string): List {
  const sourceFolder = list.find((folder) => folder.files.find((file) => file.id === source));
  const destinationFolder = list.find((folder) => folder.id === destination);

  if (!sourceFolder) {
    throw new Error('You cannot move a folder');
  }

  if (!destinationFolder) {
    throw new Error('You cannot specify a file as the destination');
  }

  const sourceFileIndex = sourceFolder.files.findIndex((file) => file.id === source);

  destinationFolder.files.push(sourceFolder.files[sourceFileIndex]);
  sourceFolder.files.splice(sourceFileIndex, 1);

  return list;
}
