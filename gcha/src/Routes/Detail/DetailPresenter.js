import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import noPoster from "../../Assets/noPosterSmall.png";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: absolute;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.div`
    font-size: 32px;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 16px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const DetailPresenter = ({ result, error, loading }) => (
    loading ? (
        <>
            <Helmet><title>Loading | Gcha</title></Helmet>
            <Loader />
        </>
    ) : (
            <Container>
                <Helmet><title>{result.original_title ? result.original_title : result.original_name} | Gcha</title></Helmet>
                <Backdrop bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : `${noPoster}`} />
                <Content>
                    <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : `${noPoster}`} />
                    <Data>
                        <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                        <ItemContainer>
                            <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                            <Divider>•</Divider>
                            <Item>{result.runtime ? result.runtime : result.episode_run_time} min</Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres && result.genres.map((genre, index) =>
                                    index === result.genres.length - 1 ? genre.name : `${genre.name} / `)}
                            </Item>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                    </Data>
                </Content>
            </Container>
        )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
}

export default DetailPresenter;