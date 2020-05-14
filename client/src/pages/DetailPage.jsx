import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { useHttp } from '../hooks'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard';

const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {

      const res = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      })

      setLink(res)
      
    } catch (e) {
      console.error(e);
    }
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader/>
  }

  return (
    <React.Fragment>
      {
        !loading && link && <LinkCard link={link} />
      }
    </React.Fragment>
  );
}

export { DetailPage }