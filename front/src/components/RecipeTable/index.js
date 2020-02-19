import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

const RecipeTable = ({ recipe }) => {
    const sides = Object.entries(recipe.sides)
        .map(([key, value]) => (/left|right/.test(key) ? { side: key, items: value } : null))
        .filter(Boolean);

    return (
        <>
            <table className={styles.root}>
                <thead>
                    <tr>
                        <th />
                        {recipe.sides.left.map(({ name }, index) => (
                            <th key={index} className={styles.tableHeading}>
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sides.map(({ side, items }) => (
                        <tr key={side}>
                            <th className={styles.tableHeading}>
                                <FormattedMessage id={`p_product_select_lenses_${side}`} />
                            </th>
                            {items.map((item, index) => (
                                <td key={index} className={styles.tableValue}>
                                    {item.value}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {recipe.extraData.map(({ name, value }) => (
                        <Fragment key={name}>
                            <tr>
                                <th className={styles.tableHeading} colSpan="4">
                                    {name}
                                </th>
                            </tr>
                            <tr>
                                <td className={styles.tableValue} colSpan="4">
                                    {value}
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
};

RecipeTable.defaultProps = {
    recipe: {},
};

RecipeTable.propTypes = {
    recipe: PropTypes.shape({
        sides: PropTypes.objectOf(PropTypes.array),
        extraData: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default RecipeTable;
