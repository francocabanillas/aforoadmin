import React from 'react';
import { render } from '@testing-library/react';

import FormTarea from '../components/sedes/FormTarea'

test('<FormTarea /> Cargar el formulario y probar que todo este correcto', () => {

    const wrapper = render(<FormTarea />)
    wrapper.debug
})
