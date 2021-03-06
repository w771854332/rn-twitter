import request from "../utils/request";
import { Aid } from "../types";

export interface Dynamic {
  id: number,
  uid: number,
  headImgUrl: string,
  nickname: string,
  brief: string,
  isWhole: number,
  img: { id: string, url: string }[],
  rawPubTime: number,
  commentNum: number,
  isLike: boolean,
  likeNum: number
}
export interface DynamicDetailResult {
  id: number,
  headImgUrl: string,
  nickname: string,
  content: string,
  img: { id: string, url: string }[],
  rawPubTime: number,
  commentNum: number,
  isLike: boolean,
  likeNum: number
}

export interface DynamicsResult {
  dynamics: Dynamic[];
  offset: number;
  hasMore: number;
}

export function getDynamics({ type = 'hot', offset = 0, limit = 20 }): Promise<DynamicsResult> {
  return request(`/dynamics?type=${type}&limit=${limit}&offset=${offset}`, {
    method: 'GET',
  });
}

export type LikesResult = boolean;

export function changeLikes(dId: string, isLike: boolean): Promise<LikesResult> {
  return request(`/dynamicLikes/${dId}`, {
    method: isLike ? 'POST' : 'DELETE',
  });
}

export function postDynamics(content: string, img = []) {
  return request('/dynamics', {
    method: 'POST',
    body: {
      content,
      img,
    },
  });
}

export function getDynamicsDetail(id: Aid): Promise<DynamicDetailResult> {
  return request(`/dynamics/${id}`, {
    method: 'GET',
  });
}
