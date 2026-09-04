from sqids import Sqids as BaseSqids


class SqidsClass(BaseSqids):
    def encode_one(self, id) -> str | None:
        if id is None:
            return None

        return self.encode([id])

    def decode_one(self, sqid) -> int | None:
        if sqid is None or sqid == "":
            return None

        seq: list[int] = self.decode(sqid)
        return seq[0]

    def decode_list(self, sqids) -> list[int]:
        if len(sqids) == 0:
            return []

        ret: list[int] = []
        for sqid in sqids:
            id: int | None = self.decode_one(sqid)
            if id is not None:
                ret.append(id)

        return ret


sqids = SqidsClass(min_length=8)
