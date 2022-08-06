type LayoutProps = {
    children: React.ReactNode
    title: string
}
export default function Layout({children, title}: LayoutProps) {
  return (
    <div>{children}</div>
  )
}
