from sqids import Sqids as BaseSqids


class SqidsClass(BaseSqids):
    def encode_one(self, id):
        return self.encode([id])

    def decode_one(self, sqid):
        seq = self.decode(sqid)
        return seq[0]


sqids = SqidsClass(min_length=8)
