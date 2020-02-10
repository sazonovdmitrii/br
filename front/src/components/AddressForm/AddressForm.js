import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import Autocomplete from 'components/Autocomplete';

import styles from './styles.css';

const AddressForm = ({ className, values: valuesProp, onSubmit, history, actions }) => {
    const [values, setValues] = useState({
        name: '',
        person: '',
        city: '',
        city_fias_id: '',
        region_fias_id: '',
        street: '',
        zip: '',
        house: '',
        corp: '',
        level: '',
        flat: '',
        code: '',
        ...valuesProp,
    });
    const handleChange = ({ target: { name, value } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = event => {
        event.preventDefault();

        const { city, ...any } = values;

        onSubmit({
            variables: { input: { ...any, city: city.value } },
        });
    };
    const handleBackURL = () => {
        history.goBack();
    };
    const handeChangeAutocomplite = (event, value) => {
        setValues(prevValues => ({ ...prevValues, city: value }));
    };
    const handleSelectAutocomplite = ({ value, region_fias_id, city_fias_id }) => {
        setValues(prevValues => ({ ...prevValues, city_fias_id, region_fias_id, city: value }));
    };
    const handleResetAutocomplite = () => {
        setValues(prevValues => ({ ...prevValues, city_fias_id: '', region_fias_id: '', city: '' }));
    };

    const { city, street, zip, house, corp, level, flat, code, name, person } = values;

    return (
        <form className={className} onSubmit={handleSubmit}>
            <InputGroup>
                <Autocomplete
                    label="Город*"
                    value={city}
                    onInputChange={handeChangeAutocomplite}
                    onSelectValue={handleSelectAutocomplite}
                    onResetValue={handleResetAutocomplite}
                />
            </InputGroup>
            <InputGroup>
                <Input label="Улица" name="street" value={street} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
                <Input label="Индекс" name="zip" value={zip} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
                <Input label="Дом" name="house" value={house} onChange={handleChange} required />
                <Input label="Офис/квартира" name="flat" value={flat} onChange={handleChange} required />
                <Input label="Домофон" name="code" value={code} onChange={handleChange} />
                <Input label="Корпус" name="corp" value={corp} onChange={handleChange} />
                <Input label="Этаж" name="level" value={level} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
                <Input label="Получатель" name="person" value={person} onChange={handleChange} />
                <Input label="Название адреса" name="name" value={name} onChange={handleChange} required />
            </InputGroup>
            <div className={styles.actions}>
                <Button type="submit" kind="primary" bold>
                    <FormattedMessage id="save_address" />
                </Button>
                {actions || (
                    <Button kind="secondary" onClick={handleBackURL} bold>
                        <FormattedMessage id="back" />
                    </Button>
                )}
            </div>
        </form>
    );
};

AddressForm.defaultProps = {};

AddressForm.propTypes = {};

export default AddressForm;
