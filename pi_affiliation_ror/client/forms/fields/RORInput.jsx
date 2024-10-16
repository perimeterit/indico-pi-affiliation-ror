import PropTypes from "prop-types";
import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from "react";

import { GridColumn, Search, Grid } from "semantic-ui-react";

import { FinalField, validators as v } from "indico/react/forms";
import { indicoAxios, handleAxiosError } from "indico/utils/axios";
import _ from "lodash";

import "../../main.scss";

const ROR_API_QUERY = "https://api.ror.org/organizations?query=";
// const ROR_API_URL = "https://api.ror.org/organizations?affiliation=";

function RORComponent({ id, value, disabled, required, onChange, name }) {
  const initialState = {
    loading: false,
    results: [],
    rorValue: value.length ? value[0]["institutionName"] : "",
  };

  const [state, dispatch] = useReducer(rorReducer, initialState);
  const { loading, results, rorValue } = state;

  function rorReducer(state, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState;
      case "START_SEARCH":
        return { ...state, loading: true, rorValue: action.query };
      case "FINISH_SEARCH":
        const ror_data = action.results.map((result) => {
          return {
            id: result.id,
            title: result.id,
            description: result.name,
            aliases: result.aliases?.toString(),
            country: result.country?.country_name,
            type: result.types?.toString(),
          };
        });

        return { ...state, loading: false, results: ror_data };
      case "UPDATE_SELECTION":
        return { ...state, rorValue: action.selection };

      default:
        throw new Error();
    }
  }

  const timeoutRef = useRef();
  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(async () => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const searchROR = function (searchParameter) {
        async function fetchROR() {
          const url = `${ROR_API_QUERY}${encodeURIComponent(searchParameter)}`;
          try {
            const res = await indicoAxios.get(url);
            const data = res.data;
            dispatch({
              type: "FINISH_SEARCH",
              results: data.items,
            });
          } catch (error) {
            // handleAxiosError(e);
            return;
          }
        }

        fetchROR();
      };

      searchROR(data.value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleChange(data) {
    onChange(data);
  }

  function resultRenderer(data) {
    return (
      <div className="content">
        <div className="title">{data.description}</div>
        <small>
          {data.type} {data.country ? ", " + data.country : ""}
        </small>
        <div className="description">{data.aliases}</div>
      </div>
    );
  }

  return (
    <Grid>
      <GridColumn width={12}>
        <Search
          loading={loading}
          input={{ icon: "search", fluid: true }}
          placeholder="ROR search..."
          resultRenderer={resultRenderer}
          onResultSelect={(e, data) => {
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.description,
            });
            handleChange([
              {
                rorId: data.result.id,
                institutionName: data.result.description,
              },
            ]);
          }}
          onSearchChange={handleSearchChange}
          results={results}
          value={rorValue}
          id={id}
          type="text"
          name={name}
          fluid
          required={required}
        />
      </GridColumn>
    </Grid>
  );
}

RORComponent.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      rorId: PropTypes.string.isRequired,
      institutionName: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

RORComponent.defaultProps = {
  disabled: false,
};

export default function RORInput({
  htmlId,
  htmlName,
  disabled,
  institutionName,
  rorId,
}) {
  return (
    <FinalField
      id={htmlId}
      name={htmlName}
      component={RORComponent}
      disabled={disabled}
      institutionName={institutionName}
      rorId={rorId}
    />
  );
}

RORInput.propTypes = {
  htmlId: PropTypes.string.isRequired,
  htmlName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  institutionName: PropTypes.string,
  rorId: PropTypes.string,
};

RORInput.defaultProps = {
  disabled: false,
  institutionName: "",
  rorId: "",
};

export const rorAffiliationSettingsInitialData = {
  rorId: "",
  institutionName: "",
};
