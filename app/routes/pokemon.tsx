import { Link, Outlet, useLocation } from '@remix-run/react'


const BreadCrumb = ({ links }: { links: string[] }) => {
  return (
    <ul className='flex'>
      {links.map((link, idx) => {
        if (link === "") {
          return <BreadCrumbLink key={link} link='/' title='home' />
        }

        return <BreadCrumbLink key={link} link={links.slice(0, idx + 1).join('/')} title={link} />
      })}
    </ul>

  )
}

const BreadCrumbLink = ({ title, link }: { title: string, link: string }) => {
  return (
    <li className="after:content-['/'] last:after:content-[] after:text-stone-500 capitalize">
      <Link to={`${link}`} className="px-2 text-stone-500 hover:underline">{title}</Link>
    </li>
  )
}

const PokemonTemplate = () => {
  const { pathname } = useLocation()

  return (
    <>
      <header className='mb-8'>
        <BreadCrumb links={pathname.split('/')} />
      </header>
      <Outlet />
    </>
  )
}

export default PokemonTemplate