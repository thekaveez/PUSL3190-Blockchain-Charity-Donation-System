import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {ethers} from 'ethers'

import {money} from '../assets'
import { CustomButton } from '../components'
import {checkIfImage} from '../utils'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });
  return (
    <div>CreateCampaign</div>
  )
}

export default CreateCampaign