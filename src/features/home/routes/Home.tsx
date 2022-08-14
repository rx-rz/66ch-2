import {MainLayout} from 'src/components/Layout/Layout'
import Postlist from 'src/features/posts/components/PostList/Postlist'
import HomePage from '../HomePage'

export default function Home ()  {
  return (
    <MainLayout>
      <HomePage/>
      <Postlist/>
    </MainLayout>
  )
}
