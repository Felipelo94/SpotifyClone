import { render, screen } from '@testing-library/react'
import Song from './Song'
import { track } from './testutiles'
import { SessionProvider } from 'next-auth/react'
import singletonRouter, { useRouter } from 'next/router'
import NextLink from 'next/link'
import { render, act, fireEvent, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import mockRouter from 'next-router-mock'

jest.mock('next/dist/client/router', () => require('next-router-mock'))

describe('next-router-mock', () => {
  mockRouter.setCurrentUrl('/')
})

describe('Song', () => {
  it('renders', () => {
    const defaultprops = { order: 1, track, fav: true, onDelete: jest.fn }

    expect(render(<Song {...props} />)).toMatchSnapshot()
  })

  it('should have an album cover', () => {
    const defaultprops = { order: 1, track, fav: true, onDelete: jest.fn }
    render(<Song {...defaultprops} />)
    const coverImage = screen.getByTestId('album-cover')

    expect(coverImage).toBeInTheDocument()
  })

  it('should have a song name', () => {
    const defaultprops = { order: 1, track, fav: true, onDelete: jest.fn }
    render(<Song {...defaultprops} />)
    const songName = screen.getByText('Dummy')

    expect(songName).toBeInTheDocument()
  })
})
