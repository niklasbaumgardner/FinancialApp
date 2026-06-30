from sqids import Sqids as BaseSqids


class SqidsClass(BaseSqids):
    def encode_one(self, id):
        if id is None:
            return None

        return self.encode([id])

    def decode_one(self, sqid):
        if sqid is None or sqid == "":
            return None

        seq = self.decode(sqid)
        return seq[0]

    def decode_list(self, sqids):
        if len(sqids) == 0:
            return []

        ret = []
        for sqid in sqids:
            id = self.decode_one(sqid)
            if id is not None:
                ret.append(id)

        return ret


sqids = SqidsClass(min_length=8)
