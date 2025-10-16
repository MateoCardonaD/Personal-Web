export default function HiddenComment({ text }: { text: string }) {
  return (
    <div aria-hidden="true" className="contents" dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />
  )
}

