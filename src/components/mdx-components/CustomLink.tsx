interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  className?: string;
}

export default function CustomLink({ ...props }: LinkProps) {
  const isAnchorLink = props.className === 'anchor';

  if (isAnchorLink) {
    return <a {...props}></a>;
  }

  return <a {...props} target="_blank" rel="noopener"></a>;
}
