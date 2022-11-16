import { NextResponse } from 'next/server';

export function middleware(req) {
  let isLogged = req.cookies.get('refreshToken');
  let url = req.url;

  if (isLogged && url.includes('/user')) {
    return NextResponse.redirect('http://localhost:3000');
  }
}