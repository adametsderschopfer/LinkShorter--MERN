import React, { useContext, useState, useEffect } from 'react';

import { useHttp } from '../hooks'
import { AuthContext } from '../context/AuthContext'
import { useCallback } from 'react';
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { token } = useContext(AuthContext)
  const {request, loading} = useHttp()

  const LinksFromServer = useCallback( async () => {
    try {
      const res = await request('/api/link', "GET", null, {
        Authorization: `Bearer ${token}`
      })

      setLinks(res)
    } catch (e) {
      console.error(e);
      
    }
  }, [token, request])

  useEffect(() => {
    LinksFromServer()
  }, [LinksFromServer])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { 
        !loading && <LinksList links={links} />
      }
    </>
  );
}
