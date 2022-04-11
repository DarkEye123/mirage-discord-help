import { useQuery, UseQueryOptions } from "react-query";
import { customFetch } from "./fetcher";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The ISO 8601 date format of the time that this resource was edited. */
  Date: any;
  Money: any;
};

export type MetaInfo = {
  __typename?: "MetaInfo";
  totalCount: Scalars["Int"];
};

export type Node = {
  id: Scalars["ID"];
};

export type Offer = {
  id: Scalars["ID"];
  imageUrl: Scalars["String"];
  name: Scalars["String"];
  status: OfferStatus;
  type: OfferType;
  updated: Scalars["Date"];
};

export type OfferList = {
  __typename?: "OfferList";
  meta: MetaInfo;
  offers: Array<Offer>;
};

export enum OfferOrderType {
  CreatedOn = "createdOn",
  LastEdited = "lastEdited",
  Status = "status",
}

export enum OfferStatus {
  Active = "active",
  Deleted = "deleted",
  Draft = "draft",
}

export enum OfferTargetType {
  All = "all",
  Collections = "collections",
  Products = "products",
}

export enum OfferType {
  Product = "product",
  SameProduct = "sameProduct",
  Service = "service",
  Smart = "smart",
}

export type ProductOffer = Node &
  Offer & {
    __typename?: "ProductOffer";
    id: Scalars["ID"];
    imageUrl: Scalars["String"];
    name: Scalars["String"];
    status: OfferStatus;
    type: OfferType;
    updated: Scalars["Date"];
  };

export type Query = {
  __typename?: "Query";
  offers?: Maybe<OfferList>;
};

export type QueryOffersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<OfferOrderType>;
  status?: InputMaybe<OfferStatus>;
};

export type ServiceOffer = Node &
  Offer & {
    __typename?: "ServiceOffer";
    id: Scalars["ID"];
    imageUrl: Scalars["String"];
    name: Scalars["String"];
    status: OfferStatus;
    type: OfferType;
    updated: Scalars["Date"];
  };

export type GetAllOffersQueryVariables = Exact<{
  orderBy?: InputMaybe<OfferOrderType>;
  status?: InputMaybe<OfferStatus>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
}>;

export type GetAllOffersQuery = {
  __typename?: "Query";
  offers?: {
    __typename?: "OfferList";
    meta: { __typename?: "MetaInfo"; totalCount: number };
    offers: Array<
      | {
          __typename?: "ProductOffer";
          id: string;
          type: OfferType;
          name: string;
          status: OfferStatus;
          imageUrl: string;
        }
      | {
          __typename?: "ServiceOffer";
          id: string;
          type: OfferType;
          name: string;
          status: OfferStatus;
          imageUrl: string;
        }
    >;
  } | null;
};

export const GetAllOffersDocument = `
    query getAllOffers($orderBy: OfferOrderType, $status: OfferStatus, $limit: Int, $offset: Int) {
  offers(orderBy: $orderBy, status: $status, limit: $limit, offset: $offset) {
    meta {
      totalCount
    }
    offers {
      id
      type
      name
      status
      imageUrl
    }
  }
}
    `;
export const useGetAllOffersQuery = <
  TData = GetAllOffersQuery,
  TError = unknown
>(
  variables?: GetAllOffersQueryVariables,
  options?: UseQueryOptions<GetAllOffersQuery, TError, TData>
) =>
  useQuery<GetAllOffersQuery, TError, TData>(
    variables === undefined ? ["getAllOffers"] : ["getAllOffers", variables],
    customFetch<GetAllOffersQuery, GetAllOffersQueryVariables>(
      GetAllOffersDocument,
      variables
    ),
    options
  );
