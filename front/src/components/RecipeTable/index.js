import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

const PUPIL_DISTANCE_ID = 11;

const RecipeTable = ({ recipe = {} }) => {
    const recipeList = Object.entries(recipe)
        .map(([key, value]) => {
            if (/(left|right)/.test(key)) {
                return {
                    position: 1,
                    side: key,
                    items: value,
                };
            } else {
                return {
                    position: 2,
                    id: key,
                    ...value,
                };
            }
        })
        .sort((a, b) => a.position - b.position);

    return (
        <>
            <table className={styles.root}>
                <thead>
                    <tr>
                        <th />
                        {recipe.left.map(({ id, name }) => (
                            <th key={id} className={styles.tableHeading}>
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {recipeList.map(({ side, items, name, value, id }) =>
                        items ? (
                            <tr key={side}>
                                <th className={styles.tableHeading}>
                                    <FormattedMessage id={`p_product_select_lenses_${side}`} />
                                </th>
                                {items.map(item => (
                                    <td key={item.id} className={styles.tableValue}>
                                        {item.value}
                                    </td>
                                ))}
                            </tr>
                        ) : (
                            <>
                                <tr>
                                    <th className={styles.tableHeading} colSpan="4">
                                        {name}
                                    </th>
                                </tr>
                                <tr key={side}>
                                    <td className={styles.tableValue} colSpan="4">
                                        {value}
                                    </td>
                                </tr>
                            </>
                        )
                    )}
                </tbody>
            </table>
        </>
    );
};

RecipeTable.defaultProps = {};

RecipeTable.propTypes = {};

export default RecipeTable;
