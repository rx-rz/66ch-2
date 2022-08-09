import {MainLayout} from 'src/components/Layout/Layout'
import Postlist from 'src/features/posts/components/PostList/Postlist'
import HomePage from '../HomePage'

export const Home = () =>  {
  return (
    <MainLayout>
      <HomePage/>
      <Postlist/>
    </MainLayout>
  )
}
