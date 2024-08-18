export interface I_Children {
  children: React.ReactNode | JSX.Element
}

export interface I_Author {
  id: string
  name: string
  age: number
}

export interface I_Book {
  name: string
  genre: string
  authorId: string
  author?: I_Author
}
